package main

import (
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"net/url"
	"testing"
	"time"
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

// SOURCE: https://stackoverflow.com/questions/22892120/how-to-generate-a-random-string-of-a-fixed-length-in-go
func randomString(n int) string {
	var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

// Hello world test
func TestHelloWorld(t *testing.T) {

	got := "My first test :D"
	want := "My first test :D"

	if got != want {
		t.Errorf("got %q, wanted %q", got, want)
	}
}

// Basic function test
func TestSample(t *testing.T) {

	got := add(11, 7)
	want := 18

	if got != want {
		t.Errorf("got %q, wanted %q", got, want)
	}
}

// Simple GET request test
func TestGetRequest(t *testing.T) {

	resp, err := http.Get("http://localhost:8080/getTest")
	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	//Convert the body to type string
	sb := string(body)
	got := sb
	want := "Hello :)"

	if got != want {
		t.Errorf("got %q, wanted %q", got, want)
	}
}

func TestLogin(t *testing.T) {

	//Successful login attempt
	data := url.Values{
		"username": {"1234"},
		"password": {"1234"},
	}

	resp, err := http.PostForm("http://localhost:8080/login", data)

	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	result := string(body)
	got := result
	want := "true"

	if got != want {
		t.Errorf("got %q, wanted %q", got, want)
	}

	//Unsuccessful login attempt
	data = url.Values{
		"username": {"1234"},
		"password": {"1235"},
	}

	resp, err = http.PostForm("http://localhost:8080/login", data)

	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()
	body, err = ioutil.ReadAll(resp.Body)
	result = string(body)
	got = result
	want = "false"

	if got != want {
		t.Errorf("got %q, wanted %q", got, want)
	}
}

func TestComment(t *testing.T) {

	data := url.Values{
		"comment": {"The Subway at the Reitz Union is alright but could be better."},
	}

	resp, err := http.PostForm("http://localhost:8080/postComment", data)

	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	result := string(body)
	got := result
	want := "The Subway at the Reitz Union is alright but could be better."

	if got != want {
		t.Errorf("got %q, wanted %q", got, want)
	}

}

func TestRegister(t *testing.T) {

	username := randomString(10)
	//User to be registered
	data := url.Values{
		"fname":    {"Joe"},
		"lname":    {"Random"},
		"username": {username},
		"password": {"12345678!#"},
		"email":    {"test@test.com"},
	}

	resp, err := http.PostForm("http://localhost:8080/register", data)

	if err != nil {
		log.Fatal(err)
	}

	//Unsuccessful login attempt
	data = url.Values{
		"username": {username},
		"password": {"12345678!#"},
	}

	resp, err = http.PostForm("http://localhost:8080/login", data)

	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	result := string(body)
	got := result
	want := "true"

	if got != want {
		t.Errorf("got %q, wanted %q", got, want)
	}
}
