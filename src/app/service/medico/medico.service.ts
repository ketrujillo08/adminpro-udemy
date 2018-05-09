import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../../service/usuario/usuario.service';
import { Medico } from '../../models/medico.model';
import { retry } from 'rxjs/operator/retry';


@Injectable()
export class MedicoService {

  constructor(public _http : HttpClient,public _usuarioService : UsuarioService) { }

  cargarMedicos(desde : number){
    let url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this._http.get(url);
  }
  cargarMedico(id:string){
    let url = URL_SERVICIOS + '/medico/' + id;

    return this._http.get(url)
    .map((res:any)=>{
      return res.medico;
    });
  }
  buscarMedico(termino : string){
    let url = URL_SERVICIOS + '/busqueda/collection/medico/' + termino;
    return this._http.get(url)
      .map((res:any)=>res.medico);
  }

  borrarMedico(id : string){
    let url = URL_SERVICIOS + '/medico/' + id +'?token=' + this._usuarioService.token;
    ;
    return this._http.delete(url)
    .map(res => {
      swal('Medico Borrado','Medico borraco correctamente','success');
      return res;
    });
  }

  guardarMedico(medico:Medico){
    let url = URL_SERVICIOS +'/medico'
    if(medico._id){
      url += '/' + medico._id + '?token=' + this._usuarioService.token;
      return this._http.put(url,medico)
      .map(
        (res:any) =>{
          swal('Medico Actualizado',medico.nombre,'success');
          return res.medico;
        }
      );

    }else{
      url += '?token=' + this._usuarioService.token;
      return this._http.post(url,medico)
      .map(
        (res:any)=>{
          swal('Médico Cread',medico.nombre,'success');
          return res.medico;
        }
      );    
    }
  }
}
