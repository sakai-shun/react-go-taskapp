package main

import (
  "encoding/json"
  "log"
  "net/http"
  "github.com/gorilla/mux"
  "github.com/rs/cors"
)

type Task struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
  }

var tasks []Task

func main() {
  router := mux.NewRouter()
  router.HandleFunc("/api/tasks", handleTask).Methods("GET", "POST", "DELETE")

  corsOptions := cors.New(cors.Options{
	AllowedOrigins: []string{"http://localhost:3000"},
	AllowedMethods: []string{"GET","POST","DELETE"},
  })
  handler := corsOptions.Handler(router)
  log.Fatal(http.ListenAndServe(":8000", handler))
}

func handleTask(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		getTask(w, r)
	case "POST":
	    createTask(w, r)
	case "DELETE":
	    deleteTask(w, r)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

func getTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}

func createTask(w http.ResponseWriter, r *http.Request) {
	var task Task
	err := json.NewDecoder(r.Body).Decode(&task)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	tasks = append(tasks, task)
	w.WriteHeader(http.StatusCreated)
}

func deleteTask(w http.ResponseWriter, r *http.Request) {

}
