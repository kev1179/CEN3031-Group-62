package main

import (
	"fmt"
	"log"
	"net/http"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type User struct {
	Firstname string
	Lastname  string
	Username  string
	Password  string
	Email     string
}

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

func loginHandler(w http.ResponseWriter, r *http.Request) {

	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}

	fmt.Println(w, "POST request successful")
	userName := r.FormValue("username")
	password := r.FormValue("password")

	db, err := gorm.Open(sqlite.Open("users.db"), &gorm.Config{})

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
		} else {
			fmt.Println("Username not found or password incorrect")
		}
	}
}

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

func main() {
	fileServer := http.FileServer(http.Dir("."))
	http.Handle("/", fileServer)
	http.HandleFunc("/register", registerHandler)
	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/hello", helloHandler)

	fmt.Printf("Starting server at port 8080\n")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
