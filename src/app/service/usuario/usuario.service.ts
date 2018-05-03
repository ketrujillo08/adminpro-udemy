import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
@Injectable()
export class UsuarioService {

  usuario:Usuario;
  token : string;
  constructor(public _http:HttpClient, public _router:Router, public _subirArchivoService:SubirArchivoService) {
   this.cargarStorage();
  }

  logOut(){
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this._router.navigate(['/login']);
    
  }

   estaLogueado(){
     return (this.token.length>5)?true:false;
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

   crearUsuario(usuario:Usuario){
        let url = URL_SERVICIOS + '/usuario';
        return this._http.post(url,usuario)
        .map((res:any)=>{
          swal('Usuario creado',res.usuario.email,'success');
          return res.usuario;
        });
   }

   guardarStorage(id:string,token:string,usuario:Usuario){
    localStorage.setItem('id',id);
    localStorage.setItem('token',token);
    localStorage.setItem('usuario',JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;

   }

   loginGoogle(token:string){
     let url = URL_SERVICIOS + '/login/google';
     return this._http.post(url,{token:token})
     .map((res:any) =>{
       this.guardarStorage(res.id,res.token,res.data.data);
       return true;
     });
   }

   login(usuario:Usuario,recordar:boolean=false){

    if(recordar){
      localStorage.setItem('email',usuario.email);
    }
    else{
      localStorage.removeItem('email');
    }
      let url = URL_SERVICIOS + '/login';
      return this._http.post(url,usuario).map((res:any)=>{
        this.guardarStorage(res.id,res.token,res.data.data);
      });
   }

   actualizar(usuario:Usuario){
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this._http.put(url,usuario)
    .map((res:any) =>{
      swal('Usuario actualizado',this.usuario.nombre,'success');
      this.guardarStorage(res.newdata._id,this.token,res.newddata);
      return true;
    });
   }

   cambiarImagen(file:File,id:string){
      this._subirArchivoService.subirArchivo(file,'usuarios',id)
      .then((res:any)=>{
        this.usuario.imagen = res.usuario.imagen;
        swal('Imagen Actualizada',this.usuario.nombre,'success');
        this.guardarStorage(id,this.token,this.usuario);
      })
      .catch(error =>{
        console.log(error);
      });
   }

}
