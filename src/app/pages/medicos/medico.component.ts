import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../service/medico/medico.service';
import { HospitalService } from '../../service/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUpService } from '../../components/modal-up/modal-up.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales : Hospital[] = [];
  medico : Medico = new Medico('',null,null,'','');
  hospital : Hospital = new Hospital('');
  constructor(
    public _medicoService : MedicoService,
    public _hospitalService : HospitalService,
    public _router: Router,
    public _activatedRoute:ActivatedRoute,
    public _modalUpService : ModalUpService
  ) {
    _activatedRoute.params.subscribe(
      params=>{
        let id = params['id'];
        if(id !== 'nuevo'){
          this.cargarMedico(id);
        }
      }
    )
  }

  ngOnInit() {

    this._hospitalService.cargarDesde(0)
    .subscribe((hospitales:any) => this.hospitales=hospitales.hospitales);
    this._modalUpService.notificacion.subscribe(
      res=>{
        console.log(res);
        this.medico.img = res.medico.img;
      }
    );
  }
  guardarMedico(form : NgForm){  
    if(!form.valid){
      return
    }
   
    this._medicoService.guardarMedico(this.medico)
    .subscribe(
      (medico:any) =>{
        console.log(medico);
        this.medico._id = medico._id;
        this._router.navigate(['/medico',this.medico._id]);
      }
    )
  }
  cambiarHospital(id:string){
    this._hospitalService.obtenerHospital(id)
    .subscribe(hospital => this.hospital = hospital);
  }
  cargarMedico(id:string){
    this._medicoService.cargarMedico(id)
    .subscribe((medico)=>{
      this.medico=medico;
      this.hospital = medico.hospital;
      this.medico.hospital = medico.hospital._id;

    });
  }
  cambiarFotografia(){
    this._modalUpService.mostrarModal('medicos',this.medico._id);

  }

}
