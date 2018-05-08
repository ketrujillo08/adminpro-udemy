import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../service/service.index';
import { ModalUpService } from './modal-up.service';

@Component({
  selector: 'app-modal-up',
  templateUrl: './modal-up.component.html',
  styles: []
})
export class ModalUpComponent implements OnInit {

  imagenSubir : File = null;
  imagenAux : string;
  constructor(public _subirArchivoService : SubirArchivoService,public _modalUpService : ModalUpService) { }

  ngOnInit() {
  }

  subirImagen(){
    this._subirArchivoService.subirArchivo(this.imagenSubir,this._modalUpService.tipo,this._modalUpService.id)
      .then(res=>{
          this._modalUpService.notificacion.emit(res);
          this.cerrarModal();
      })
      .catch( err =>{
        console.log("Error en la carga");
      })
  }

  cerrarModal(){
    this.imagenAux = null;
    this.imagenSubir = null;
    this._modalUpService.ocultarModal();
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

}
