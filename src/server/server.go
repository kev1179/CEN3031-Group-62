package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/google/uuid"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// map stores all users
var userMap = map[string]User{}

// Class to represent user data. This will have to be expanded as the site grows.
type User struct {
	Firstname string
	Lastname  string
	Username  string
	Password  string
	Email     string
}

type Login struct {
	Username string
	Password string
}
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> ffce9f6 (Created handler function for handling login request using JSON. Still needs to be tested.)
=======

>>>>>>> b291e1e (Added a function called getComments which sends a JSON response back to the client containing user comments.)
// map stores user sessions
var sessions = map[string]Session{}

// Keeps track of the active user in the browsing session. This may need to be removed as I think a cookie based approach to this problem is better
// https://www.sohamkamani.com/golang/session-cookie-authentication/
type Session struct {
	// we can use user class as attribute or just username string
	user   User
	expiry time.Time
}

// Keeps track of data when user makes a comment. We need to figure out how to seperate the comments by page.
type Comment struct {
	Username string
	Time     string
	Message  string
	Page     string
}

type Review struct {
	Username string
	Time     string
	Message  string
	Page     string
	Stars    float64
}

// Determines if session has expired
func (s Session) isExpired() bool {
	return s.expiry.Before(time.Now())
}

// Registers a new user into the database.
func registerHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}
	fmt.Println("POST request successful")
	firstName := r.FormValue("fname")
	lastName := r.FormValue("lname")
	userName := r.FormValue("username")
	password := r.FormValue("password")
	email := r.FormValue("email")

	db, err := gorm.Open(sqlite.Open("users.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	user := User{Firstname: firstName, Lastname: lastName, Username: userName, Password: password, Email: email}
	if err := db.Where("Username = ?", userName).First(&user).Error; err != nil {
		db.Create(&user)
	} else {
		fmt.Println("Username already taken. Please choose a different one")
	}
}

// Determines if a login attempt was successful.
func loginHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}

	fmt.Println("POST request successful")
	userName := r.FormValue("username")
	password := r.FormValue("password")

	db, err := gorm.Open(sqlite.Open("users.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	var user User
	sessionToken := ""
	var expiresAt time.Time
	login := false

	db.Where("Username = ?", userName).First(&user)
	if err := db.Where("Username = ?", userName).First(&user).Error; err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Println("Username not found or password incorrect")
	} else {
		if password == user.Password {
			fmt.Println("Login Successful!")
			login = true
			// uuids are super helpful as they're difficult to guess
			sessionToken = uuid.NewString()
			expiresAt = time.Now().Add(120 * time.Second)

			sessions[sessionToken] = Session{
				user:   user,
				expiry: expiresAt,
			}

			http.SetCookie(w, &http.Cookie{
				Name:    "session_token",
				Value:   sessionToken,
				Expires: expiresAt,
			})

		} else {
			fmt.Println("Username not found or password incorrect")
		}
	}
	if login {
		http.Redirect(w, r, "http://localhost:4200/about", 301)
	}
}

// Determines if a login attempt was successful. (used for test in server_test.go)
func loginTestHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}

	fmt.Println("POST request successful")
	userName := r.FormValue("username")
	password := r.FormValue("password")

	db, err := gorm.Open(sqlite.Open("users.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	var user User
	sessionToken := ""
	var expiresAt time.Time
	login := false

	db.Where("Username = ?", userName).First(&user)
	if err := db.Where("Username = ?", userName).First(&user).Error; err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Println("Username not found or password incorrect")
	} else {
		if password == user.Password {
			fmt.Println("Login Successful!")
			login = true
			// uuids are super helpful as they're difficult to guess
			sessionToken = uuid.NewString()
			expiresAt = time.Now().Add(120 * time.Second)

			sessions[sessionToken] = Session{
				user:   user,
				expiry: expiresAt,
			}

			http.SetCookie(w, &http.Cookie{
				Name:    "session_token",
				Value:   sessionToken,
				Expires: expiresAt,
			})

		} else {
			fmt.Println("Username not found or password incorrect")
		}
	}
	if login {
		fmt.Fprintf(w, "true")
	} else {
		fmt.Fprintf(w, "false")
	}
}

// Login handled through JSON
func loginHandlerJSON(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}

	//fmt.Println("POST request successful")
	//Source: https://gist.github.com/tomnomnom/52dfa67c7a8c9643d7ce
	d := json.NewDecoder(r.Body)
	loginAttempt := &Login{}
	err := d.Decode(loginAttempt)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	userName := loginAttempt.Username
	password := loginAttempt.Password

	db, err := gorm.Open(sqlite.Open("users.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	var user User
	sessionToken := ""
	var expiresAt time.Time
	login := false

	db.Where("Username = ?", userName).First(&user)
	if err := db.Where("Username = ?", userName).First(&user).Error; err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Println("Username not found or password incorrect")
	} else {
		if password == user.Password {
			//fmt.Println("Login Successful!")
			login = true
			// uuids are super helpful as they're difficult to guess
			sessionToken = uuid.NewString()
			expiresAt = time.Now().Add(120 * time.Second)

			sessions[sessionToken] = Session{
				user:   user,
				expiry: expiresAt,
			}

			http.SetCookie(w, &http.Cookie{
				Name:    "session_token",
				Value:   sessionToken,
				Expires: expiresAt,
			})

		} else {
			fmt.Println("Username not found or password incorrect")
		}
	}
	if login {
		http.Redirect(w, r, "http://localhost:4200/about", 301)
	}
}

// Determines if a login attempt was successful. (used for test in server_test.go)
func loginTestHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}

	fmt.Println("POST request successful")
	userName := r.FormValue("username")
	password := r.FormValue("password")

	db, err := gorm.Open(sqlite.Open("users.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	var user User
	sessionToken := ""
	var expiresAt time.Time
	login := false

	db.Where("Username = ?", userName).First(&user)
	if err := db.Where("Username = ?", userName).First(&user).Error; err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Println("Username not found or password incorrect")
	} else {
		if password == user.Password {
			fmt.Println("Login Successful!")
			login = true
			// uuids are super helpful as they're difficult to guess
			sessionToken = uuid.NewString()
			expiresAt = time.Now().Add(120 * time.Second)

			sessions[sessionToken] = Session{
				user:   user,
				expiry: expiresAt,
			}

			http.SetCookie(w, &http.Cookie{
				Name:    "session_token",
				Value:   sessionToken,
				Expires: expiresAt,
			})

		} else {
			fmt.Println("Username not found or password incorrect")
		}
	}
	if login {
		fmt.Fprintf(w, "true")
	} else {
		fmt.Fprintf(w, "false")
	}
}

// Login handled through JSON
func loginHandlerJSON(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}

	//fmt.Println("POST request successful")
	//Source: https://gist.github.com/tomnomnom/52dfa67c7a8c9643d7ce
	d := json.NewDecoder(r.Body)
	loginAttempt := &Login{}
	err := d.Decode(loginAttempt)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	userName := loginAttempt.Username
	password := loginAttempt.Password

	db, err := gorm.Open(sqlite.Open("users.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	var user User
	sessionToken := ""
	var expiresAt time.Time
	login := false

	db.Where("Username = ?", userName).First(&user)
	if err := db.Where("Username = ?", userName).First(&user).Error; err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Println("Username not found or password incorrect")
	} else {
		if password == user.Password {
			//fmt.Println("Login Successful!")
			login = true
			// uuids are super helpful as they're difficult to guess
			sessionToken = uuid.NewString()
			expiresAt = time.Now().Add(120 * time.Second)

			sessions[sessionToken] = Session{
				user:   user,
				expiry: expiresAt,
			}

			http.SetCookie(w, &http.Cookie{
				Name:    "session_token",
				Value:   sessionToken,
				Expires: expiresAt,
			})

		} else {
			fmt.Println("Username not found or password incorrect")
		}
	}
	if login {
		http.Redirect(w, r, "http://localhost:4200/about", 301)
	}
}

// Sample get request for front-end team to try
func getRequestTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	fmt.Fprintf(w, "Hello :)")

}

// Puts a comment into the database when user creates a comment.
func commentHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}

	fmt.Println("POST request successful")
	commentMessage := r.FormValue("comment")
	currentTime := time.Now()
	db, err := gorm.Open(sqlite.Open("comments.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}
	//Username should be activeuser making the comment. Page should be supplied by front end when making post request.
	//Sending this data via JSON would be the best approach.
	comment := Comment{Username: "Bob", Time: currentTime.Format("01-02-2006 15:04:05"), Message: commentMessage, Page: "Food"}
	fmt.Fprintf(w, comment.Message)
	db.Create(&comment)
}

// Sends JSON back to client containing all the comments needed
// https://stackoverflow.com/questions/41433207/gorm-db-findusers-to-json-with-gin-in-golang
func getComments(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	db, err := gorm.Open(sqlite.Open("comments.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	commentList := []Comment{}
	db.Find(&commentList)

	response, _ := json.Marshal(commentList)

	w.Write([]byte(response))
}

// Test to make sure GO server is working properly
func helloHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.URL.Path != "/hello" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method is not supported.", http.StatusNotFound)
		return
	}

	fmt.Fprintf(w, "Hello!")
}

// SOURCE: https://www.sohamkamani.com/golang/session-cookie-authentication/
func welcomeHandler(w http.ResponseWriter, r *http.Request) {
	// We can obtain the session token from the requests cookies, which come with every request
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	c, err := r.Cookie("session_token")
	if err != nil {
		if err == http.ErrNoCookie {
			// If the cookie is not set, return an unauthorized status
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		// For any other type of error, return a bad request status
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	sessionToken := c.Value

	// We then get the session from our session map
	userSession, exists := sessions[sessionToken]
	if !exists {
		// If the session token is not present in session map, return an unauthorized error
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	// If the session is present, but has expired, we can delete the session, and return
	// an unauthorized status
	if userSession.isExpired() {
		delete(sessions, sessionToken)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// If the session is valid, return the welcome message to the user
	w.Write([]byte(fmt.Sprintf("Welcome %s!", userSession.user.Username)))
}

func refreshHandler(w http.ResponseWriter, r *http.Request) {
	// (BEGIN) The code from this point is the same as the first part of the `Welcome` route
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	c, err := r.Cookie("session_token")
	if err != nil {
		if err == http.ErrNoCookie {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	sessionToken := c.Value

	userSession, exists := sessions[sessionToken]
	if !exists {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	if userSession.isExpired() {
		delete(sessions, sessionToken)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	// (END) The code until this point is the same as the first part of the `Welcome` route

	// If the previous session is valid, create a new session token for the current user
	newSessionToken := uuid.NewString()
	expiresAt := time.Now().Add(120 * time.Second)

	// Set the token in the session map, along with the user whom it represents
	sessions[newSessionToken] = Session{
		user:   userSession.user,
		expiry: expiresAt,
	}

	// Delete the older session token
	delete(sessions, sessionToken)

	// Set the new token as the users `session_token` cookie
	http.SetCookie(w, &http.Cookie{
		Name:    "session_token",
		Value:   newSessionToken,
		Expires: time.Now().Add(120 * time.Second),
	})
}

func logoutHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	c, err := r.Cookie("session_token")
	if err != nil {
		if err == http.ErrNoCookie {
			// If the cookie is not set, return an unauthorized status
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		// For any other type of error, return a bad request status
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	sessionToken := c.Value

	// remove the users session from the session map
	delete(sessions, sessionToken)

	// We need to let the client know that the cookie is expired
	// In the response, we set the session token to an empty
	// value and set its expiry as the current time
	http.SetCookie(w, &http.Cookie{
		Name:    "session_token",
		Value:   "",
		Expires: time.Now(),
	})
}

func writeReview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}

	fmt.Println("POST request successful")
	reviewMessage := r.FormValue("message")
	numStars := r.FormValue("stars")
	currentTime := time.Now()
	db, err := gorm.Open(sqlite.Open("reviews.db"), &gorm.Config{})

	stars, err := strconv.ParseFloat(numStars, 64)
	if err != nil {
		panic("failed to connect database")
	}
	//Username should be activeuser making the comment. Page should be supplied by front end when making post request.
	//Sending this data via JSON would be the best approach.
	review := Review{Username: "Bob", Time: currentTime.Format("01-02-2006 15:04:05"), Message: reviewMessage, Page: "Food", Stars: stars}
	fmt.Fprintf(w, review.Message)
	db.Create(&review)
}

// IGNORE: for unit testing setup
func add(x, y int) (res int) {
	return x + y
}

// Starts server and sets URL's front-end can send requests to
func main() {
	fileServer := http.FileServer(http.Dir("."))
	http.Handle("/", fileServer)
	http.HandleFunc("/register", registerHandler)
	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/logintest", loginTestHandler)
	http.HandleFunc("/hello", helloHandler)
	http.HandleFunc("/welcome", welcomeHandler)
	http.HandleFunc("/refresh", refreshHandler)
	http.HandleFunc("/logout", logoutHandler)
	http.HandleFunc("/getTest", getRequestTest)
	http.HandleFunc("/postComment", commentHandler)
	http.HandleFunc("/writeReview", writeReview)

	fmt.Printf("Starting server at port 8080\n")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
