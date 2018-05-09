import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Hospital } from '../../models/hospital.model';
@Injectable()
export class HospitalService {

  hospital : Hospital;
  token : string;
  usuario : string;

  constructor(public _http:HttpClient) { 
    this.cargarStorage();
  }

   cargarDesde(desde : number){
    let url = URL_SERVICIOS + '/hospital/';
    url += '?desde=' + desde;
    return this._http.get(url);
  }
  buscarHospital(termino : string){
    let url = URL_SERVICIOS + '/busqueda/collection/hospital/' + termino;
    return this._http.get(url)
    .map((res : any)=>res.hospital);

  }
  obtenerHospital(id:string){
    let url = URL_SERVICIOS + '/hospital/' +id;
    return this._http.get(url)
    .map((res:any)=>res.hospital);
  }
  actualizarHospital(hospital : Hospital){
    let url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this.token;
    return this._http.put(url,hospital);
  }
  crearHospital(hospital : Hospital){
    let url = URL_SERVICIOS + '/hospital/?token=' + this.token;
    return this._http.post(url,hospital);
  }
  borrarHospital(hospital : Hospital){
    let url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this.token;
    return this._http.delete(url);
  }  
  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

}
