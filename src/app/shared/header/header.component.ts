import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/service.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  public usuario :Usuario;
  constructor(public _usuarioService:UsuarioService,
              public _router : Router
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }
  buscar(termino : string){
    this._router.navigate(['/busqueda',termino]);
  }

}
