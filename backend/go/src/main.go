package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func getFile(w http.ResponseWriter, r *http.Request) {
	//GET vars from router
	vars := mux.Vars(r)
	file := vars["file"]

	//set header
	w.WriteHeader(http.StatusOK)

	//read file
	data, err := ioutil.ReadFile("served_files/" + vars["file"])

	//check err
	if err != nil {
		//make error json
		error := `[{ 
			error: 'Could not retrieve <strong>` + file + `</strong> from file server.' 
		}]`
		//write error and exit
		w.Write([]byte(error))
		return
	}

	//write file data into response
	w.Write(data)
}

//entry point
func main() {
	//make router
	r := mux.NewRouter()
	//make get route
	r.HandleFunc("/files/{file}", getFile).Methods("GET")
	//listen on port 80 with CORS
	log.Fatal(http.ListenAndServe(":80", handlers.LoggingHandler(os.Stdout, handlers.CORS(
		handlers.AllowedMethods([]string{"GET"}),
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedHeaders([]string{"X-Requested-With"}))(r))))
}
