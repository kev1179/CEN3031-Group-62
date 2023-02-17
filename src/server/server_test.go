package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"testing"
)

func TestHelloWorld(t *testing.T) {

	got := "My first test :D"
	want := "My first test :D"

	if got != want {
		t.Errorf("got %q, wanted %q", got, want)
	}
}

func TestSample(t *testing.T) {

	got := add(11, 7)
	want := 18

	if got != want {
		t.Errorf("got %q, wanted %q", got, want)
	}
}

func TestGetRequest(t *testing.T) {

	/*
		if err := http.ListenAndServe(":8080", nil); err != nil {
			log.Fatal(err)
		}
	*/
	resp, err := http.Get("http:localhost:8080/getTest")
	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	//Convert the body to type string
	sb := string(body)
	log.Printf(sb)
	got := sb
	want := "Hello :)"

	if got != want {
		t.Errorf("got %q, wanted %q", got, want)
	}
}
