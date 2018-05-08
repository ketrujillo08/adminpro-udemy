import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../service/service.index';
import { ModalUpService } from '../../components/modal-up/modal-up.service';

declare const swal :any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  
  usuarios : Usuario[]=[];
  desde : number = 0;
  cargando : boolean = true;

  totalRegistros = 0;
  
  constructor(public _usuariosService : UsuarioService,public _modalUpService : ModalUpService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUpService.notificacion.subscribe(res =>{ this.cargarUsuarios();})
  }
  mostarModal(id:string){
    this._modalUpService.mostrarModal('usuarios',id);  
  }
  cargarUsuarios(){
    this.cargando = true;
    this._usuariosService.cargarUsuarios(this.desde)
      .subscribe(
        (res : any) => {
          console.log(res);
          this.totalRegistros = res.total;
          this.usuarios = res.usuarios;
          this.cargando = false;
        }
      );
  }
  cargarDesde(valor : number){
    let desde = this.desde + valor;
    if(desde>=this.totalRegistros){
      return;
    }
    if(desde < 0 ){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }
  buscarUsuario(termino : string){
    if(termino.length <=0){
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuariosService.buscarUsuarios(termino)
    .subscribe(
      (usuarios:Usuario[])=>{
        this.usuarios = usuarios;
      }
    );
  }
  borrarUsuario(usuario : Usuario){
    if(usuario._id === this._usuariosService.usuario._id){
      swal('Fatal Error','No se puede borrar a si mismo','error');
      return;
    }
    swal({
      title:'¿Estas seguro?',
      text:'Estas a punto de borrar a ' + usuario.nombre,
      icon : 'warning',
      buttons:true,
      dangerMode:true
    })
    .then(borrar =>{
      if(borrar){
        this._usuariosService.borrarUsuario(usuario._id)
        .subscribe(res =>{
          this.cargarUsuarios();
        });
      }
    });
  }
  guardarUsuario(usuario : Usuario){
    this._usuariosService.actualizar(usuario)
    .subscribe();
  }

}
