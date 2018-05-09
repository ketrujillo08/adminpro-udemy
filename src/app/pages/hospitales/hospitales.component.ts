import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../service/service.index';
import { ModalUpService } from '../../components/modal-up/modal-up.service';
import { Hospital } from '../../models/hospital.model';
declare const swal : any; 
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  cargando : boolean = false;
  hospitales : Hospital[];
  totalRegistros : number = 0;
  desde : number = 0;

  constructor(public _hospitalService : HospitalService, public _modalUp : ModalUpService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUp.notificacion.subscribe(res=>{this.cargarHospitales();})
  }

  buscarHospital(value :string){
    if(value.length <=0){
      this.cargarHospitales();
      return;
    }
    this._hospitalService.buscarHospital(value)
    .subscribe((hospital:Hospital[])=>{
      this.hospitales = hospital;
    });
  }
  cargarHospitales(){
    this._hospitalService.cargarDesde(this.desde)
    .subscribe(
      (res:any)=>{
        this.hospitales = res.hospitales;
        this.totalRegistros = res.total;
      }
    )

  }
  cargarDesde(desde : number){
    this.desde+=desde;
    if(this.desde <= 0){
      this.desde = 0;
    }
    if(this.desde >= this.totalRegistros){
      this.desde -= 5;
    }

    this.cargarHospitales();
  }
  guardarHospital(hospital : Hospital){
    if(hospital.nombre.length <= 0){
      swal("Error al actualizar","No se ha podido actualizar el nombre del hospital","warning");
    }else{
      this._hospitalService.actualizarHospital(hospital)
      .subscribe((res:any) => {
          if(res.ok){
            swal("Hospital Actualizado","Nombre del hospital actualizado correctamente","success");
          }else{
            swal("Error al actualizar","No se ha podido actualizar el nombre del hospital","warning");
          }
      });
    }
   
  }
  borrarHospital(hospital : Hospital){

    swal({
      title:'¿Estas seguro?',
      text:'Estas a punto de borrar a ' + hospital.nombre,
      icon : 'warning',
      buttons:true,
      dangerMode:true
    })
    .then(borrar =>{
      if(borrar){
        return this._hospitalService.borrarHospital(hospital)
          .subscribe(res=>{
            this.cargarHospitales();
            console.log(res);
          });
      }
    });
    
  }
  mostrarModal(id : string){ 
    this._modalUp.mostrarModal('hospitales',id);
  }
  sweetNew(){
    swal("Nuevo Hospital",{
      button: {
        text: "Guardar",
        closeModal: true,
      },
      content:"input"
    })
    .then(nombreHospital =>{
      if(!nombreHospital){
        return {ok:false}
      }else{
        let newhospital = new Hospital(nombreHospital);
        this.crearHospital(newhospital);
        return {ok:true,mensaje:newhospital}
      }
    })
    .then(res=>{
      if(!res.ok){
        swal("Error al guardar","No se escribio ningun hospital","warning");
      }else{
        swal("Hospital Guardado","El nuevo hospital se ha añadido","success");
      }
    });
  }

  crearHospital(hospital : Hospital){
    this._hospitalService.crearHospital(hospital)
    .subscribe(res=>{
      this.cargarHospitales();
    });  
  }




}
