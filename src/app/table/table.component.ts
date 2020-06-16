import { Component, OnInit } from '@angular/core';
import { AUTOMOVILES } from '../data';
import { Automovil } from '../models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AutosService } from '../autos.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  autos: Automovil[];
  autoSeleccionado: Automovil;
  page: number;
  pageSize: number;
  closeResult = '';
  
  constructor(private modalService: NgbModal, private autoService: AutosService) { }

  ngOnInit() {
    this.page = +sessionStorage.getItem('currentPage');
    this.pageSize = 10;
    this.autoService.getAutos().subscribe((response)=>{
      this.autos = response.data;

    })
  }
  onSelect(auto: Automovil, modal){
    this.autoSeleccionado = auto;
    this.modalService.open(modal);
  }

}
