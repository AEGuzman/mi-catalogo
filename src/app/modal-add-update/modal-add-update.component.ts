import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Automovil } from '../models';

@Component({
  selector: 'app-modal-add-update',
  templateUrl: './modal-add-update.component.html',
  styleUrls: ['./modal-add-update.component.css']
})
export class ModalAddUpdateComponent  {

  accion: string;

  
  auto: Automovil = {} as Automovil;
  rango = [2000,2020];
  

  constructor(public activeModal: NgbActiveModal) { }
  

onSubmit(){

  
  this.activeModal.close(this.auto);

  if(this.rango[0]<=this.rango[1]){
    this.auto.modelos = [];
    for(var i=this.rango[0];i<=this.rango[1];i++){
      console.log("Numero: ",i," Tipo: ",typeof i);
      this.auto.modelos.push(i);
    }

}


}}