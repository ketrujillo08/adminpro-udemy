import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class UsuarioService {

  usuario:Usuario;
  token : string;
  menu : any = [];
  constructor(public _http:HttpClient, public _router:Router, public _subirArchivoService:SubirArchivoService) {
   this.cargarStorage();
  }

  logOut(){
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this._router.navigate(['/login']);
    
  }

   estaLogueado(){
     return (this.token.length>5)?true:false;
   }

   cargarStorage(){
     if(localStorage.getItem('token')){
       this.token = localStorage.getItem('token');
       this.usuario = JSON.parse(localStorage.getItem('usuario'));
       this.menu = JSON.parse(localStorage.getItem('menu'));
     }else{
       this.token = '';
       this.usuario = null;
       this.menu = null;
     }
   }

   crearUsuario(usuario:Usuario){
        let url = URL_SERVICIOS + '/usuario';
        return this._http.post(url,usuario)
        .map((res:any)=>{
          swal('Usuario creado',res.usuario.email,'success');
          return res.usuario;
        })
        .catch(err =>{
          swal(err.error.message,err.error.errors.message,'error');
          return Observable.throw(err);
          
        });
   }

   guardarStorage(id:string,token:string,usuario:Usuario,menu?:any){
    localStorage.setItem('id',id);
    localStorage.setItem('token',token);
    localStorage.setItem('usuario',JSON.stringify(usuario));
    localStorage.setItem('menu',JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

   }

   loginGoogle(token:string){
     let url = URL_SERVICIOS + '/login/google';
     return this._http.post(url,{token:token})
     .map((res:any) =>{
       this.guardarStorage(res.id,res.token,res.data.data,res.menu);
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
      return this._http.post(url,usuario)
      .map((res:any)=>{
        this.guardarStorage(res.id,res.token,res.data.data,res.menu);
      })
      .catch(err=>{
        swal('Error en login',err.error.data.message,'error');
        return Observable.throw(err);
      });
   }
   renuevaToken(){
     let url = URL_SERVICIOS + '/login/renuevatoken';
     url += '?token=' + this.token;
     return this._http.get(url)
       .map((res:any)=>{
          this.token = res.token;
          localStorage.setItem('token',this.token);
          return true;
       })
       .catch(erro =>{

        swal('Session perdida', 'No se pudo renovar su autentificación','error');
        this._router.navigate(['/login']);
  
        return Observable.throw(erro);
    
       });
   }

   actualizar(usuario:Usuario){
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this._http.put(url,usuario)
    .map((res:any) =>{
      if(usuario._id === this.usuario._id){
        let usuarioBD : Usuario = res.newdata;
        this.guardarStorage(usuarioBD._id,this.token,usuarioBD);
      }
      swal('Usuario actualizado',this.usuario.nombre,'success');
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

   cargarUsuarios(desde : number = 0){
      let url = URL_SERVICIOS + '/usuario?desde=' + desde;
      return this._http.get(url);

   }

   buscarUsuarios(termino : string){
     let url = URL_SERVICIOS + '/busqueda/collection/usuario/' + termino;
     return this._http.get(url)
       .map((res:any)=>res.usuario);
   }
   borrarUsuario(id : string){
     let url = URL_SERVICIOS + '/usuario/' + id;
     url += '?token=' + this.token;

     return this._http.delete(url)
     .map(res=>{
       swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
       return true;
     });
   }

}
