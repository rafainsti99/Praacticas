import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected http: HttpClient) { }

  getAutores(){
    console.log("ha llegado");
    return this.http.get('http://localhost:3000/authors');
  }

  getLibros(){
    console.log("ha llegado");
    return this.http.get('http://localhost:3000/books');
  }
}
