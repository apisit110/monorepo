package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

/**
 * HOW TO DECLARE VARIABLE
 */
var tmp1 string = "hello"

type fakeData struct {
	Id     int    // json.Marshal - first character must be uppercase, otherwise can not print to screen
	Name   string // json.Marshal - first character must be uppercase, otherwise can not print to screen
	Gender string // json.Marshal - first character must be uppercase, otherwise can not print to screen
	Email  string // json.Marshal - first character must be uppercase, otherwise can not print to screen
}

type Middleware func(http.HandlerFunc) http.HandlerFunc

func MultipleMiddleware(h http.HandlerFunc, m ...Middleware) http.HandlerFunc {

	if len(m) < 1 {
		return h
	}

	wrapped := h

	// loop in reverse to preserve middleware order
	for i := len(m) - 1; i >= 0; i-- {
		wrapped = m[i](wrapped)
	}

	return wrapped

}

func LogMiddleware(h http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		log.SetOutput(os.Stdout) // logs go to Stderr by default
		log.Println(r.Method, r.URL)
		h.ServeHTTP(w, r) // call ServeHTTP on the original handler

	})
}

func CorsMiddleware(handler http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Request-Method", "GET, POST, PUT, DELETE")
		w.Header().Add("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Authorization")
		handler.ServeHTTP(w, r)
	})
}

// HOW TO DECLARE FUNCTION
func myHandler(w http.ResponseWriter, r *http.Request) {
	// The := Short variable declaration can only be used inside functions
	// tmp2 := "world!"
	// fmt.Printf("TEST: %s %s", tmp1, tmp2)

	// result, _ := json.Marshal(&fakeData{1, "dev", "male", "dev@email.com"}) // object to json
	// fmt.Println(string(result))                                             // []byte to string

	switch r.Method {
	case http.MethodGet:
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("my byte value"))
	case http.MethodPost:
		w.Header().Set("Content-Type", "application/json")
		// w.Write([]byte(`{"Id":1,"Name":"dev","Gender":"male","Email":"dev@email.com"}`))

		_fakeData := fakeData{}
		err := json.Unmarshal([]byte(`{"Id":1,"Name":"dev","Gender":"male","Email":"dev@email.com"}`), &_fakeData)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf(`id: %d, name: %s, gender: %s, email: %s\n`, _fakeData.Id, _fakeData.Name, _fakeData.Gender, _fakeData.Email)
		w.Write([]byte("123"))
	}

}

func main() {
	// http.HandleFunc("/", myHandler) // no middleware

	myHandlerController := http.HandlerFunc(myHandler)
	http.Handle("/", MultipleMiddleware(myHandlerController,
		LogMiddleware,
		CorsMiddleware))
	http.ListenAndServe("127.0.0.1:5000", nil)
}
