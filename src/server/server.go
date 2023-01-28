/*
GORM SAMPLE CODE
package main

import (
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Code  string
	Price uint
}

func main() {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	db.AutoMigrate(&Product{})

	fmt.Println("Ran correctly!")
}
*/

package main

import (
	"fmt"
	"log"
	"net/http"
)

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

	fmt.Println(firstName)
	fmt.Println(lastName)
	fmt.Println(userName)
	fmt.Println(password)
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
	http.HandleFunc("/hello", helloHandler)

	fmt.Printf("Starting server at port 8080\n")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
