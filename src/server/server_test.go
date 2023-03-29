package main

import (
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"

	"net/http/httptest"
	"net/url"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/stretchr/testify/require"
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

	resp, err := http.PostForm("http://localhost:8080/logintest", data)

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

	resp, err = http.PostForm("http://localhost:8080/logintest", data)

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

	//Successful login attempt
	data = url.Values{
		"username": {username},
		"password": {"12345678!#"},
	}

	resp, err = http.PostForm("http://localhost:8080/logintest", data)

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

	// duplicate username
	// we need to include a message that the registration did not work
	data = url.Values{
		"fname":    {"Impostor"},
		"lname":    {"AmongUS"},
		"username": {username}, // <- same username
		"password": {"electrical"},
		"email":    {"test@sus.com"},
	}

	resp, err = http.PostForm("http://localhost:8080/register", data)

	if err != nil {
		log.Fatal(err)
	}

	//Unsuccessful login attempt
	data = url.Values{
		"username": {username},
		"password": {"electrical"},
	}

	resp, err = http.PostForm("http://localhost:8080/logintest", data)

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

// standard cookie tester
func TestCookie(t *testing.T) {
	var user User
	sessionToken := uuid.NewString()
	var expiresAt = time.Now().Add(120 * time.Second)

	sessions[sessionToken] = Session{
		user:   user,
		expiry: expiresAt,
	}

	// Create new HTTP Recorder (implements http.ResponseWriter)
	recorder := httptest.NewRecorder()

	// Place cookie on recorder
	http.SetCookie(recorder, &http.Cookie{Name: "testToken", Value: sessionToken, Expires: expiresAt})

	// Copy cookie over to a new request
	request := &http.Request{Header: http.Header{"Cookie": recorder.HeaderMap["Set-Cookie"]}}

	// Extract the cookie from the request.
	cookie, err := request.Cookie("testToken")

	require.NoError(t, err, "Failed to read 'test' Cookie: %v", err)
	require.Equal(t, cookie.Value, sessionToken)
}

// test if userSession time was expired
func TestExpries(t *testing.T) {
	// notice this time is a year before the current time
	oneYearBefore := time.Date(2022, time.February, 26, 2, 7, 0, 0, time.UTC)

	// isExpired() should return true

	var user User
	sessionToken := uuid.NewString()
	var expiresAt = oneYearBefore

	sessions[sessionToken] = Session{
		user:   user,
		expiry: expiresAt,
	}

	var result = "true"
	userSession := sessions[sessionToken]
	if userSession.isExpired() {
		result = "true"
	} else {
		result = "false"
	}

	got := result
	want := "true"

	if got != want {
		t.Errorf("got %q, wanted %q", got, want)
	}
}

// test for writing review
func TestWriteReview(t *testing.T) {
	data := url.Values{
		"stars":   {"2"},
		"message": {"Food mushy. No flavor."},
	}

	resp, err := http.PostForm("http://localhost:8080/writeReview", data)

	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	result := string(body)
	got := result
	want := "Food mushy. No flavor."

	if got != want {
		t.Errorf("got %q, wanted %q", got, want)
	}
}

<<<<<<< HEAD
func TestWelcomeHandler(t *testing.T) {
=======
<<<<<<< HEAD
<<<<<<< HEAD
func TestWelcomeHandler(t *testing.T) {
=======
func TestWelcomeRefreshLogoutHandlers(t *testing.T) {
>>>>>>> 5e86b9d (Fixed issue with login and register unit testing not working and added a few additional tests like testWriteReview. Currently working on welcome, refresh, and logout handler unit tests.)
=======
func TestWelcomeHandler(t *testing.T) {
>>>>>>> 0fb51df (Added test case for welcome handler to redirect to the about page.)
>>>>>>> Login-Front
	data := url.Values{
		"username": {"1234"},
		"password": {"1234"},
	}

<<<<<<< HEAD
	resp, err := http.PostForm("http://localhost:8080/login", data)
=======
<<<<<<< HEAD
<<<<<<< HEAD
	resp, err := http.PostForm("http://localhost:8080/login", data)
=======
	resp, err := http.PostForm("http://localhost:8080/logintest", data)
>>>>>>> 5e86b9d (Fixed issue with login and register unit testing not working and added a few additional tests like testWriteReview. Currently working on welcome, refresh, and logout handler unit tests.)
=======
	resp, err := http.PostForm("http://localhost:8080/login", data)
>>>>>>> 0fb51df (Added test case for welcome handler to redirect to the about page.)
>>>>>>> Login-Front

	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()
<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> Login-Front

	if resp.StatusCode != http.StatusNotFound {
		t.Errorf("Redirect failed, expected %d got %d\n", http.StatusFound, resp.StatusCode)
	}
	// this is still in the works
	resp, err = http.Get("http://localhost:8080/about")
<<<<<<< HEAD
=======
=======
	body, err := ioutil.ReadAll(resp.Body)
	result := string(body)
	got := result
	want := "true"
=======
>>>>>>> 0fb51df (Added test case for welcome handler to redirect to the about page.)

	if resp.StatusCode != http.StatusNotFound {
		t.Errorf("Redirect failed, expected %d got %d\n", http.StatusFound, resp.StatusCode)
	}
	// this is still in the works
<<<<<<< HEAD
	resp, err = http.Get("http://localhost:8080/welcome")
>>>>>>> 5e86b9d (Fixed issue with login and register unit testing not working and added a few additional tests like testWriteReview. Currently working on welcome, refresh, and logout handler unit tests.)
=======
	resp, err = http.Get("http://localhost:8080/about")
>>>>>>> 0fb51df (Added test case for welcome handler to redirect to the about page.)
>>>>>>> Login-Front

	if err != nil {
		log.Fatalln(err)
	}

	if resp.StatusCode != http.StatusNotFound {
		t.Errorf("Redirect failed, expected %d got %d\n", http.StatusFound, resp.StatusCode)
	}
}
