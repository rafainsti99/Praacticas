import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Biblioteca de Rafa y Paco';
  autores;
  libros;
  isbnLibro;
  nombreLibro;
  opcionLibro;
  opcionAutor;
  dniAutor;
  nombreAutor;
  apellidoAutor;


constructor(
  protected userService :UserService
){}

public formularioAutoresJSON(id){

  var formulario = document.getElementById(id);
}

public datosAutores(){

  console.log("ma");

  if(this.opcionAutor == "crear"){
    if(this.dniAutor != "" && this.apellidoAutor != "" && this.nombreAutor != ""){
      console.log("Estas creando un autor");
      console.log(this.apellidoAutor);
      console.log(this.nombreAutor);
    }

  }
  else if(this.opcionAutor == "modificar" && this.dniAutor != "" && this.apellidoAutor != "" && this.nombreAutor != ""){
    var json = {
      id:this.dniAutor,
      firstName:this.nombreAutor,
      lastName:this.apellidoAutor
    }
    console.log(document.getElementById('formularioAutoresJSON').outerHTML)
    console.log(this.dniAutor);
    console.log(this.nombreAutor);
    console.log(this.apellidoAutor);
    console.log(json.id);
    console.log(json.firstName);
    console.log(json.lastName);
    this.userService.modificarAutor(this.dniAutor,json)
    .subscribe(
    
      (data) => { // Success
        console.log("¡Bien HECHO, CAMPEÓN!");
        
           
      }
    );
  }
}



datosLibros(){
  
  console.log("Hola Rafa y Paco");
  console.log(this.nombreLibro);
  console.log(this.isbnLibro);
  console.log(this.opcionLibro);

  if(this.opcionLibro == "crear"){
    if(this.nombreLibro != "" && this.isbnLibro != ""){
      console.log("Estas creando")
    }

  }
  else if (this.opcionLibro == "modificar"){
    if(this.nombreLibro != "" && this.isbnLibro != ""){
      console.log("Estas MODIFICANDO")
    }

  }
}

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

















