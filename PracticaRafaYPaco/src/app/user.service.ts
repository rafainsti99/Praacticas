import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected http: HttpClient) { }

  getAutores(){
    return this.http.get('localhost/bibliotecagnommo/authors');
  }

  getAutor(id){
    return this.http.get('localhost/bibliotecagnommo/author/'+id);
  }
}
