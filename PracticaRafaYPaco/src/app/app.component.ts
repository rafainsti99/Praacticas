import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { FormsModule }   from '@angular/forms';
import { escapeRegExp } from '@angular/compiler/src/util';

declare var $:any;

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
  comienzo = true;
constructor(
  protected userService :UserService
){}

public usuarioExiste(id){
  this.userService.getAutor(id)
  .subscribe((data) => {
      console.log(data['id']);
      localStorage.setItem('existe','true');
    },error => {
      localStorage.setItem('existe','false');
    }
    
  );

}

public formularioAutoresJSON(elementos){

  var datos={};
      for(var i=0;i<elementos.length;i++){
        var element = elementos[i];
        var name = element.name;
        var value = element.value;

        if(name){
          datos[name]=value
        }
      }
  return datos;
}

public getNombreAutor(id){

  this.userService.getAutor(String(id))
      .subscribe(
        (data) =>{
            localStorage.setItem('autor',data['firstName'])
        });

}

public verLibro(isbn){
this.userService.getBook(isbn)
  .subscribe(
    
    (data) => { // Success
      this.getNombreAutor(data['author'])
      console.log(data['isbn']);
      console.log(data['name']);
      
      var nombreAutor = String(localStorage.getItem('autor'));   
      console.log(nombreAutor);

      if(document.getElementById("infLibro") == null){
        var mdiv = document.createElement("div");
        var parrafo = document.createElement("p");
        var isbn = document.createTextNode("ISBN: "+data['isbn']);
        var parrafo2 = document.createElement("p");
        var nombre = document.createTextNode("Nombre: "+data['name']);
        var parrafo3 = document.createElement("p");
        var nameAutor = document.createTextNode("Autor: "+nombreAutor);
        var mh1 = document.createElement("h1");
        mh1.style.marginTop = '-23px';
        var infProd =  "Información del producto:";
        var cerrar = document.createElement("img");
        cerrar.setAttribute('src','assets/cerrarVentana.png');
        cerrar.setAttribute('id', "xcerrar");
        cerrar.setAttribute('style','width:50px;height:50px;');
        cerrar.style.height = '30px';
        cerrar.style.width = '30px';
        cerrar.style.marginLeft = '470px';
        
        mh1.append(infProd);
        parrafo.append(isbn);
        parrafo2.append(nombre);
        parrafo3.append(nameAutor);
        mdiv.append(cerrar);
        mdiv.append(mh1);
        mdiv.append(parrafo);
        mdiv.append(parrafo2);
        mdiv.append(parrafo3);
        mdiv.setAttribute('id',"infLibro");
        mdiv.style.textAlign = "center";
        mdiv.style.paddingBottom = "40px";
        mdiv.style.marginTop = "-40em";
        mdiv.style.backgroundColor = "#CBCBCB"
        mdiv.style.marginLeft = "40.5%";
        mdiv.style.border = "2px solid black";
        mdiv.style.borderRadius = "6px";
        mdiv.style.position = "absolute";
        mdiv.style.width = "500px";
        mdiv.style.zIndex = "10";
        document.body.append(mdiv);
        
        document.getElementById("xcerrar").addEventListener('click', function(event){
          this.parentElement.remove();
        })
      }
    
    }
    );

}

public datosAutores(){
  var expReg = /^(\d{8})([A-Z])$/;
  var JSONform = this.formularioAutoresJSON(document.getElementById('formularioAutoresJSON').querySelectorAll("input"));

  if(this.opcionAutor == "crear"){
    
    if(this.dniAutor != undefined && this.apellidoAutor != undefined && this.nombreAutor != undefined){
      
      this.usuarioExiste(this.dniAutor);

      if(localStorage.getItem('existe') == 'false'){
        var expReg = /^(\d{8})([A-Z])$/;
        
        if(expReg.test(this.dniAutor)){

          this.userService.crearAutor(JSONform)
          .subscribe(
          
            (data) => { // Success
              console.log("¡Bien HECHO!");
            }
          );
          alert("Autor añadido correctamente");
        }


else{
  alert("Dni mal introducido")
}

      }else{
        alert("Dni ya existe o esta mal introducido")
      }
    
      
    }else{
      alert("Asegurese de introducir todos los campos");
    }

  }
  else if(this.opcionAutor == "modificar" && this.dniAutor != "" && this.apellidoAutor != "" && this.nombreAutor != ""){

    this.userService.modificarAutor(this.dniAutor,JSONform)
    .subscribe(
    
      (data) => { // Success
        alert("Autor modificado correctamente");
      }
    );
  }
}



datosLibros(){

  if(this.opcionLibro == "crear"){
    if(this.nombreLibro != "" && this.isbnLibro != ""){
    }

  }
  else if (this.opcionLibro == "modificar"){
    if(this.nombreLibro != "" && this.isbnLibro != ""){
    }

  }
}

ngOnInit() {
  this.usuarioExiste('11111110P');

  this.userService.getAutores()
  .subscribe(
    
    (data) => { // Success
      this.autores = data; 
         
    }
  );

  this.userService.getLibros()
  .subscribe(
    
    (data) => { // Success
      this.libros = data; 
         
    }
  );
  
}



}

















