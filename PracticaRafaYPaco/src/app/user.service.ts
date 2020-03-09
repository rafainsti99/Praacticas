import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected http: HttpClient) { }

  getAutores(){
    return this.http.get('http://localhost:3000/authors');
  }

  getAutor(id){
    return this.http.get('http://localhost:3000/authors/'+id);
  }

  modificarAutor(id,datos){
    return this.http.patch('http://localhost:3000/authors/'+id,datos);

  }
  
  crearAutor(datos){
    return this.http.post('http://localhost:3000/authors',datos);
  }

  getLibros(){
    return this.http.get('http://localhost:3000/books');
  }

  getBook(id){
    return this.http.get('http://localhost:3000/books/'+id);
  }

}
