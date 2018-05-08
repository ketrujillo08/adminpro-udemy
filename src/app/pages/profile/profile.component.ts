import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Form } from '@angular/forms';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario : Usuario;
  imagenSubir : File = null;
  imagenAux : string;

  constructor(public _usuarioService:UsuarioService) { 
    this.usuario=_usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario:Usuario){
    //console.log(usuario);
    this.usuario.nombre = usuario.nombre;
    if(!this.usuario.google){
      this.usuario.email = usuario.email;
    }
    this._usuarioService.actualizar(this.usuario).subscribe();

  }

  seleccionImagen(archivo : File){
    if(!archivo){
      this.imagenSubir = null;
      return;
    }
    if(archivo.type.indexOf('image')<0){
      swal('Solo imágenes','El archivo seleccionado no es una imagen','erro');
      this.imagenSubir = null;
      return;
    }


    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemo = reader.readAsDataURL(archivo);
    reader.onloadend = ()=>{
      this.imagenAux = reader.result;
    }

  }

  cambiarImagen(){
     this._usuarioService.cambiarImagen(this.imagenSubir,this.usuario._id);
  }

}
