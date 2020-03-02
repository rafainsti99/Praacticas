import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Biblioteca de Rafa y Paco';
  autores;
  libros;


constructor(
  protected userService :UserService
){}


ngOnInit() {
  this.userService.getAutores()
  .subscribe(
    
    (data) => { // Success
      console.log(data);
      this.autores = data; 
         
    }
  );

  this.userService.getLibros()
  .subscribe(
    
    (data) => { // Success
      console.log(data);
      this.libros = data; 
         
    }
  );

  
}
}

















