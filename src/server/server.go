package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
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

// Class to represent login information
type Login struct {
	Username string
	Password string
}

// map stores user sessions
var sessions = map[string]Session{}

// tracks how many users are currently active
var activeUsers = 0

// Keeps track of the active user in the browsing session. This may need to be removed as I think a cookie based approach to this problem is better
// https://www.sohamkamani.com/golang/session-cookie-authentication/
type Session struct {
	// we can use user class as attribute or just username string
	user   User
	expiry time.Time
}

// Keeps track of data when user makes a comment.
type Comment struct {
	Username string
	Time     string
	Message  string
	Page     string
}

// Keeps track of data when user writes a review.
type Review struct {
	Username    string
	Time        string
	Message     string
	Restauraunt string
	Stars       float64
}

// Keeps track of personal data from user.
type Info struct {
	Age        int64
	Weight     float64
	Height     string
	Gender     string
	Disorder   bool
	GlutenFree bool
	Veggie     bool
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
		activeUsers++
		fmt.Println("Current Active Users: " + strconv.Itoa(activeUsers))
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
		activeUsers++
		fmt.Println("Current Active Users: " + strconv.Itoa(activeUsers))
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
// greets the logged in user with a welcome message
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

// refreshes the session cookie for the user
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

// once user logs out, it'll reset the session cookie
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
	activeUsers--
	fmt.Println("User was removed")
	fmt.Println("Current Active Users: " + strconv.Itoa(activeUsers))

	// We need to let the client know that the cookie is expired
	// In the response, we set the session token to an empty
	// value and set its expiry as the current time
	http.SetCookie(w, &http.Cookie{
		Name:    "session_token",
		Value:   "",
		Expires: time.Now(),
	})
}

// puts a review into the database when user writes a review
func writeReview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}

	fmt.Println("POST request successful")
	reviewMessage := r.FormValue("message")
	restauraunt := r.FormValue("restauraunt")
	numStars := r.FormValue("stars")
	currentTime := time.Now()
	db, err := gorm.Open(sqlite.Open("reviews.db"), &gorm.Config{})

	stars, err := strconv.ParseFloat(numStars, 64)
	if err != nil {
		panic("failed to connect database")
	}
	//Username should be activeuser making the comment. Page should be supplied by front end when making post request.
	//Sending this data via JSON would be the best approach.
	review := Review{Username: "Bob", Time: currentTime.Format("01-02-2006 15:04:05"), Message: reviewMessage, Restauraunt: restauraunt, Stars: stars}
	fmt.Fprintf(w, review.Message)
	db.Create(&review)
}

// collects favorite restaurants by user from the database
func getFavoriteRestaurants(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}

	fmt.Println("POST request successful")
	db, err := gorm.Open(sqlite.Open("reviews.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	var reviews []Review
	db.Where("stars = ?", "5").First(&reviews)

	for i := 0; i < len(reviews); i++ {
		fmt.Println(reviews[i].Restauraunt)
	}
	fmt.Fprintf(w, "Sent!")
}

// Puts info/dietary preferences into the database when user posts their information
func infoHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}

	fmt.Println("POST request successful")
	age := r.FormValue("age")
	weight := r.FormValue("weight")
	heightFeet := r.FormValue("feet")
	heightInches := r.FormValue("inches")
	gender := r.FormValue("gender")
	hasDisorder := r.FormValue("disorder")
	noGluten := r.FormValue("glutenFree")
	isVeggie := r.FormValue("veggie")
	db, err := gorm.Open(sqlite.Open("information.db"), &gorm.Config{})

	myAge, err := strconv.ParseInt(age, 64, 4)
	myWeight, err := strconv.ParseFloat(weight, 64)
	disorder, err := strconv.ParseBool(hasDisorder)
	gluten, err := strconv.ParseBool(noGluten)
	veggie, err := strconv.ParseBool(isVeggie)
	if err != nil {
		panic("failed to connect database")
	}

	information := Info{Age: myAge, Weight: myWeight, Height: heightFeet + "'" + heightInches,
		Gender: gender, Disorder: disorder, GlutenFree: gluten, Veggie: veggie}
	fmt.Fprintf(w, "Info Collected.")
	db.Create(&information)
}

// prints about screen in terminal
func printAboutScreen() {
	fmt.Println("")
	fmt.Println("Welcome to the backend portion of the Bang For Your Buck website!")
	fmt.Println("Here we store and organize data received from the client side")
	fmt.Println("and ensure that the functionality of the website works properly!")
	fmt.Println("-----------------------------------------------------------------")
	fmt.Println("Here we have a list of commands that you can use for the terminal to get started:")
	fmt.Println("")
	fmt.Println(" - go run server.go - the standard way of running the backend for this website (runs default port 8080)")
	fmt.Println(" - go run server.go --help - prints the list of API request handlers avaiable")
	fmt.Println(" - go run server.go start [portNumber] - start up the backend at a custom port")
	fmt.Println("-----------------------------------------------------------------")
	fmt.Println("If you would like to revisit the about screen, type the command: go run server.go --about")
}

// prints help screen in terminal
func printHelpScreen() {
	fmt.Println("")
	fmt.Println("Back-End API request handlers:")
	fmt.Println("All requests are in the form http://localhost:8080/[handler]")
	fmt.Println("Here are the handlers implemented:")
	fmt.Println("\n1) register - Registers new user")
	fmt.Println("2) login - Sends login request to server")
	fmt.Println("3) logintest - A login function designed to handle unit tests")
	fmt.Println("4) hello - A hello request meant to test the functionality of the server")
	fmt.Println("5) welcome - Generates a cookie")
	fmt.Println("6) refresh - Refreshes the active cookie")
	fmt.Println("7) logout - Logs the current user out by getting rid of the current cookie")
	fmt.Println("8) getTest - Handler meant to test out GET requests")
	fmt.Println("9) postComment - Sends a user comment to the backend to be placed in a database")
	fmt.Println("10) writeReview - Sends a user review on a certain restaurant to be sent to the backend to be placed in database")
	fmt.Println("11) getFavoriteRestaurants - Compiles a list of the most popular restaurants and returns it to front-end")
	fmt.Println("12) inputInfo - Collects data from the user about their dietary info and gets sent to the backend for placing in database")
}

// Starts server and sets URL's front-end can send requests to
func main() {

	args := os.Args
	port := ":8080" // default

	if len(args) > 1 {
		// prints out the list of handlers provided for the backend
		if args[1] == "--help" {
			printHelpScreen()
			return
		}

		if args[1] == "--about" {
			printAboutScreen()
			return
		}

		// if we wish to start at a different port, port must be specified
		if args[1] == "start" {
			tempPort := args[2]
			port = ":" + tempPort
		} else {
			fmt.Println("Seems like you typed the command incorrectly.")
			fmt.Println("Type the command -> go run server.go --about <- for assistance")
			return
		}
	}

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
	http.HandleFunc("/getFavoriteRestaurants", getFavoriteRestaurants)
	http.HandleFunc("/inputInfo", infoHandler)

	portString := strings.ReplaceAll(port, ":", "")

	fmt.Printf("Starting server at port " + portString + "\n")
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatal(err)
	}
}
