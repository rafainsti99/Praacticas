import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  nombre:string;
  apellido1:string;
  apellido2:string;

  constructor() { }

  ngOnInit(): void {
  }

  nuevoRegistro():void{
    console.log(this.nombre + " " + this.apellido1);
  }

}
