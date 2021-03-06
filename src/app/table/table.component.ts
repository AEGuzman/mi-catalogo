import { Component, OnInit } from '@angular/core';
import { AUTOMOVILES } from '../data';
import { Automovil } from '../models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AutosService } from '../autos.service';
import { ModalAddUpdateComponent } from '../modal-add-update/modal-add-update.component';
import { ModalConfirmActionComponent } from '../modal-confirm-action/modal-confirm-action.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  autos: Automovil[];
  autoSeleccionado: Automovil;
  auto: Automovil = {} as Automovil
  page: number;
  pageSize: number;
  searchText;
 
  displayProgressBar: boolean;
  
  constructor(private modalService: NgbModal, private autoService: AutosService) { }

  ngOnInit() {
    this.displayProgressBar = true;
 
    this.pageSize = 10;
    this.page = +sessionStorage.getItem('currentPage');
    
    this.autoService.getAutos().subscribe((response)=>{
      setTimeout(() =>{
      this.displayProgressBar = false;
      this.autos = response.data;
      }, 1500)
      

    })
  }
  onSelect(auto: Automovil, modal){
    this.autoSeleccionado = auto;
    this.modalService.open(modal);
  }

  openModalEditar(auto: Automovil){
    const modalRef = this.modalService.open(ModalAddUpdateComponent, { centered: true});
    modalRef.componentInstance.auto = auto;
    modalRef.componentInstance.accion = 'Editar';

    modalRef.result.then(
      (auto)=>{
        this.autoService.updateAutos(auto).subscribe(value=> {
          sessionStorage.setItem('currentPage',this.page.toString());
          this.ngOnInit();
        });
      },
      (reason)=>{
        console.log(reason)
      }
    )

  }

  openModalAgregar(auto: Automovil){
    const modalRef = this.modalService.open(ModalAddUpdateComponent, {centered: true});
    modalRef.componentInstance.auto = auto;
    modalRef.componentInstance.accion = 'Agregar';
    modalRef.result.then(
      (auto)=>{
        this.autoService.addAuto(auto).subscribe(response => {
          sessionStorage.setItem('currentPage',this.page.toString());
          this.ngOnInit();
        });
      },
      (reason)=>{
        console.log(reason)
      }
    )

  }


  openModalConfirmarEliminar(auto: Automovil){
    const modalRef = this.modalService.open(ModalConfirmActionComponent, {centered: true})
    modalRef.componentInstance.auto = auto;
    modalRef.result.then(
      (autoTemp)=>{
        this.autoService.deleteAuto(autoTemp).subscribe(response=> {
          sessionStorage.setItem('currentPage',this.page.toString());
          this.ngOnInit();
          console.log("Respuesta cuando se termina de eliminar un auto")
          console.log(response)
        })
      },
      (reason)=>{
        console.log(reason)
      }
    )
  }

}
