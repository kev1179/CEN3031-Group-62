package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"testing"
)

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
