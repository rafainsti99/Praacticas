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
  libros:any;
  isbnLibro;
  nombreLibro;
  opcionLibro;
  opcionAutor;
  autorLibro;
  dniAutor;
  nombreAutor;
  apellidoAutor;
  comienzo = true;
  infAutor;
  infNombre;
  posiciones;
  infISBN;
  dnis=[];
constructor(
  protected userService :UserService
){}

public accionLibro(continuar){

  if(this.isbnLibro != undefined && this.isbnLibro != "" && this.nombreLibro != "" &&  this.nombreLibro != undefined && this.autorLibro != undefined && this.autorLibro != ""){
  
  var JSONform = this.formularioAutoresJSON(document.getElementById('formularioLibrosJSON').querySelectorAll("input"));
  if(continuar==0){
  
    this.usuarioExiste(this.autorLibro,1)
  }else{
  if (localStorage.getItem('existe')=="true" && this.opcionLibro == "crear"){

  var expReg = /^(\d{8})([A-Z])$/; 
  if(expReg.test(this.autorLibro)){
        
          this.userService.crearLibro(JSONform)
          .subscribe(
          
            (data) => { // Success
              alert("Libro añadido correctamente");
            },(error) =>{
              alert("Libro ya existe, introduzca uno nuevo")
            }
          );
        }else{
          alert("asegurese de estar introduciendo un dni correcto");
        }

}
else if (localStorage.getItem('existe')=="false" && this.opcionLibro == "crear"){
  
  alert("Autor no existe o ya tiene el mísmo libro")

}

if (localStorage.getItem('existe')=="true" && this.opcionLibro == "modificar"){

    this.userService.modificarLibro(this.isbnLibro,JSONform)
    .subscribe(
    
      (data) => { // Success
        alert("Libro modificado correctamente");
      },(error) =>{
        alert("Libro no existe, introduzca uno que exista")
      }
    );
    
}else if(localStorage.getItem('existe')=="false" && this.opcionLibro == "modificar"){
  alert("Autor no existe");
}

  }
}else{
  alert("Introduce todos los campos")
}
///////////////////////////////////
}

public libroExiste(){

  this.userService.getBook(this.isbnLibro)
  .subscribe(
    (data) => { // Successins

   if(this.opcionLibro=="crear"){
    localStorage.setItem('existe',"false");
   }

   else if(this.opcionLibro=="modificar"){
     localStorage.setItem('existe', 'true');
   }

     
      this.accionLibro(0) // <- localStorage HAS the data
    },
    (error) => { // error

      if(this.opcionLibro=="crear"){
        localStorage.setItem('existe',"true");
       }
    
       else if(this.opcionLibro=="modificar"){
         localStorage.setItem('existe', 'false');
       }

       
     this.accionLibro(0) // <- localStorage HAS the data
    }
  );
}



public usuarioExiste(id,opcion){

if (opcion==1){
  this.userService.getAutor(id)
  .subscribe(
    (data) => { // Successins
    localStorage.setItem('existe',"true");
      this.accionLibro(1) // <- localStorage HAS the data
    },
    (error) => { // error
         localStorage.setItem('existe', 'false');

     this.accionLibro(1) // <- localStorage HAS the data
    }
  );


}else{
  this.userService.getAutor(id)
  .subscribe(
    (data) => { // Successins

   if(this.opcionAutor=="crear"){
    localStorage.setItem('existe',"false");
   }

   else if(this.opcionAutor=="modificar"){
     localStorage.setItem('existe', 'true');
   }

     
      this.accionAuthor() // <- localStorage HAS the data
    },
    (error) => { // error

      if(this.opcionAutor=="crear"){
        localStorage.setItem('existe',"true");
       }
    
       else if(this.opcionAutor=="modificar"){
         localStorage.setItem('existe', 'false');
       }

       
     this.accionAuthor() // <- localStorage HAS the data
    }
  );
}
}

public accionAuthor(){

  var JSONform = this.formularioAutoresJSON(document.getElementById('formularioAutoresJSON').querySelectorAll("input"));
  if(this.dniAutor != undefined && this.apellidoAutor != undefined && this.nombreAutor != undefined && this.nombreAutor != "" && this.apellidoAutor !="" && this.dniAutor != ""){
  if (localStorage.getItem('existe')=="true" && this.opcionAutor == "crear"){
      var expReg = /^(\d{8})([A-Z])$/;
      
      if(expReg.test(this.dniAutor)){

        this.userService.crearAutor(JSONform)
        .subscribe(
        
          (data) => { // Success
            console.log("¡Bien HECHO!");
          }
        );
        alert("Autor añadido correctamente");
    }else{
      alert("Dni esta mal introducido")
    }
  }
  
  else if (localStorage.getItem('existe')=="false" && this.opcionAutor == "crear"){
    if(this.dniAutor == undefined && this.dniAutor ==null){
      alert("Introduce un DNI");
    }

    else{alert("Autor existe, introduce un usuario no existente")}
  
  }

  if (localStorage.getItem('existe')=="true" && this.opcionAutor == "modificar"){
 

    this.userService.modificarAutor(this.dniAutor,JSONform)
    .subscribe(
    
      (data) => { // Success
        alert("Autor modificado correctamente");
      }
    );
    
}else if(localStorage.getItem('existe')=="false" && this.opcionAutor == "modificar"){
  alert("Autor no existe");
}
}else{
  alert("Asegurese de introducir todos los campos");
}
}




public formularioAutoresJSON(elementos){

  var datos={};
      for(var i=0;i<elementos.length;i++){
        var element = elementos[i];
        var name = element.name;
        var value = element.value;

        if(name){

            datos[name]=value;
        }
      }
  return datos;
}


public verLibro(isbn,nombre,autor){
this.userService.getAutor(autor)
  .subscribe(
    
    (data) => { // Success
      this.infAutor = data['firstName'];
      this.crearDivLibro(isbn, nombre, this.infAutor);
    }
    
    );

    
}

public crearDivLibro(isbn, nombre, autor){


if(document.getElementById("infLibro") == undefined && document.getElementById("infLibro") == null){
  var mdiv = document.createElement("div");
  var parrafo = document.createElement("p");
  var parrafo2 = document.createElement("p");
  
  var parrafo3 = document.createElement("p");
  var nameAutor = document.createTextNode("Autor: "+autor);
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
  parrafo.append(document.createTextNode("ISBN: "+isbn));
  parrafo2.append(document.createTextNode("Nombre: "+nombre));
  parrafo3.append(nameAutor);
  mdiv.append(cerrar);
  mdiv.append(mh1);
  mdiv.append(parrafo);
  mdiv.append(parrafo2);
  mdiv.append(parrafo3);
  mdiv.setAttribute('id',"infLibro");
  mdiv.style.textAlign = "center";
  mdiv.style.paddingBottom = "40px";
  mdiv.style.backgroundColor = "#CBCBCB";
  mdiv.style.marginLeft = "40%";
  mdiv.style.marginTop = "-10%";
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


datosLibros(){

  var JSONform2 = this.formularioAutoresJSON(document.getElementById('formularioLibrosJSON').querySelectorAll("input"));
  if(this.opcionLibro == "crear"){
    if(this.nombreLibro != undefined && this.isbnLibro != undefined && this.autorLibro !=undefined && this.autorLibro !="" && this.isbnLibro !="" && this.nombreLibro !=""){
    }
    
  }
  else if (this.opcionLibro == "modificar"){
    if(this.nombreLibro != undefined && this.isbnLibro != undefined && this.autorLibro !=undefined && this.autorLibro !="" && this.isbnLibro !="" && this.nombreLibro !=""){
      this.userService.modificarLibro(this.isbnLibro,JSONform2)
      .subscribe(
    
        (data) => { // Success
          alert("Libro modificado correctamente");
        }
      );
    }else{
      alert("Debe de completar todos los campos para poder operar");
    }

  }
}

ngOnInit() {

  this.userService.getAutores()
  .subscribe(
   
    (data) => { // Success
      this.autores = data; 
    });

  this.userService.getLibros()
  .subscribe(
    
    (data) => { // Success
      this.libros = data; 
    }
  );

  var libros = document.getElementsByClassName("libros");
  for(var i=0;i<libros.length;i++){

    libros[i].addEventListener("mouseenter",function(){

      this.setAttribute('style','cursor:grab;');
    });
  }
}

}
