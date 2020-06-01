import { Component, OnInit } from '@angular/core';
import { AUTOMOVILES } from '../data';
import { Automovil } from '../models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  autos: Automovil[];
  autoSeleccionado: Automovil;
  closeResult = '';
  
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.autos = AUTOMOVILES;
  }
  onSelect(auto: Automovil, modal){
    this.autoSeleccionado = auto;
    this.modalService.open(modal);
  }

}
