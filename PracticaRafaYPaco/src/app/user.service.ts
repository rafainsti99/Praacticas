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

  getAutor(id){
    return this.http.get('http://localhost:3000/authors/'+id);
  }

  modificarAutor(id,json){
    return this.http.patch('http://localhost:3000/authors/'+id,json);

  }

  getLibros(){
    console.log("ha llegado");
    return this.http.get('http://localhost:3000/books');
  }

}
