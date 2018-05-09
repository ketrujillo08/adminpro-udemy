import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../service/medico/medico.service';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  totalRegistros : number = 0;
  cargando : boolean = false;
  desde : number = 0;
  medicos : Medico[];
  constructor(public _medicoService : MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  buscarMedico(termino : string){
    if(termino.length>0){
      this._medicoService.buscarMedico(termino)
      .subscribe(
        medicos => this.medicos = medicos
      );
    }else{
      this.cargarMedicos();
    }
  }
  crearMedico(){
  }
  cargarDesde(desde : number){
    this.desde += desde;
    if(this.desde<=0){
      this.desde = 0;
    }
    if(this.desde>=this.totalRegistros){
      this.desde -= 5 ;
    }
    this.cargarMedicos();
  }
  cargarMedicos(){
    this.cargando=true;
    this._medicoService.cargarMedicos(this.desde)
    .subscribe(
      (res:any)=>{
        this.medicos = res.medicos;
        this.totalRegistros = res.total;
        this.cargando=false;
      }
    )

  }

  borrarMedico(medico : Medico){
      this._medicoService.borrarMedico(medico._id)
      .subscribe((res:any)=>{
        this.cargarMedicos()
      });
  }

}
