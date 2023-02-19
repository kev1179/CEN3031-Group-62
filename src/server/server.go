package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// Class to represent user data. This will have to be expanded as the site grows.
type User struct {
	Firstname string
	Lastname  string
	Username  string
	Password  string
	Email     string
}

// Keeps track of the active user in the browsing session. This may need to be removed as I think a cookie based approach to this problem is better
// https://www.sohamkamani.com/golang/session-cookie-authentication/
type ActiveUser struct {
	user User
}

// Keeps track of data when user makes a comment. We need to figure out how to seperate the comments by page.
type Comment struct {
	Username string
	Time     string
	Message  string
	Page     string
}

// Registers a new user into the database.
func registerHandler(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}
	fmt.Println(w, "POST request successful")
	firstName := r.FormValue("fname")
	lastName := r.FormValue("lname")
	userName := r.FormValue("username")
	password := r.FormValue("password")
	email := r.FormValue("email")

	db, err := gorm.Open(mysql.Open("users.db"), &gorm.Config{})

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
func (activeUser ActiveUser) loginHandler(w http.ResponseWriter, r *http.Request) {

	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}

	fmt.Println(w, "POST request successful")
	userName := r.FormValue("username")
	password := r.FormValue("password")

	db, err := gorm.Open(mysql.Open("users.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}
	var user User
	db.Where("Username = ?", userName).First(&user)
	if err := db.Where("Username = ?", userName).First(&user).Error; err != nil {
		fmt.Println("Username not found or password incorrect")
	} else {
		if password == user.Password {
			fmt.Println("Login Successful!")
			activeUser.user = user
		} else {
			fmt.Println("Username not found or password incorrect")
		}
	}
	file, _ := json.MarshalIndent(activeUser.user, "", " ")
	_ = ioutil.WriteFile("activeuser.json", file, 0644)
	http.Redirect(w, r, "http://localhost:4200/about", 301)
}

// Sample get request for front-end team to try
func getRequestTest(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello :)")

}

// Sends the current user over to the front end team. As mentioned before we may need to do this completely differently.
func getActiveUsername(w http.ResponseWriter, r *http.Request) {

	jsonFile, err := os.Open("activeuser.json")

	if err != nil {
		fmt.Println(err)
	}
	byteValue, _ := ioutil.ReadAll(jsonFile)
	var activeUser User
	json.Unmarshal(byteValue, &activeUser)
	fmt.Fprintf(w, activeUser.Username)
	defer jsonFile.Close()
}

// Puts a comment into the database when user creates a comment.
func commentHandler(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}

	fmt.Println(w, "POST request successful")
	commentMessage := r.FormValue("comment")
	currentTime := time.Now()
	db, err := gorm.Open(sqlite.Open("comments.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}
	//Username should be activeuser making the comment. Page should be supplied by front end when making post request.
	comment := Comment{Username: "Bob", Time: currentTime.Format("01-02-2006 15:04:05"), Message: commentMessage, Page: "Food"}
	db.Create(&comment)

}

// Test to make sure GO server is working properly
func helloHandler(w http.ResponseWriter, r *http.Request) {
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

// IGNORE: for unit testing setup
func add(x, y int) (res int) {
	return x + y
}

// Starts server and sets URL's front-end can send requests to
func main() {
	var user User
	fileServer := http.FileServer(http.Dir("."))
	http.Handle("/", fileServer)
	http.HandleFunc("/register", registerHandler)
	http.HandleFunc("/login", ActiveUser{user}.loginHandler)
	http.HandleFunc("/hello", helloHandler)
	http.HandleFunc("/getTest", getRequestTest)
	http.HandleFunc("/getUsername", getActiveUsername)
	http.HandleFunc("/postComment", commentHandler)

	db, err := sql.Open("mysql", "root:mkap3031CEN@tcp(127.0.0.1:3306)/testdb")
	if err != nil {
		panic(err.Error())
	} else {
		fmt.Println("Successfully Connected to MySQL database")
	}
	defer db.Close()

	fmt.Printf("Starting server at port 8080\n")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
