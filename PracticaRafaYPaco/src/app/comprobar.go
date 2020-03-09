package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
)

type Author struct {
	id        string
	firstName string
	lastName  string
}

func conseguirDNI(w http.ResponseWriter, r *http.Request) {

	fmt.Println("method:", r.Method)

	if r.Method == "GET" {

		params := r.URL.Query()
		dni := params.Get("dni")
		db, err := sql.Open("mysql", "bibliotecaAdmin:bibliotecaAdmin12345@tcp(127.0.0.1:3306)/bibliotecagnommo")
		sqlStatement := `SELECT * FROM authors WHERE id=$1;`
		row := db.QueryRow(sqlStatement, dni)

		err := row.Scan(&author.id, &author.firstName, &author.lastName)

		switch err {

		case sql.ErrNoRows:
			fmt.Println("No existen usuarios con ese dni")

			return
		case nil:

			return

		}

	}
}

func main() {
	http.HandleFunc("/conseguirDni", conseguirDNI)

	err := http.ListenAndServe(":9090", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
