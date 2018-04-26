import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../service.index';


@Injectable()
export class LoginGuardGuard implements CanActivate {
  constructor(public _usuarioService : UsuarioService, public _router:Router){

  }
  canActivate()
  {
    if(this._usuarioService.estaLogueado()){
      console.log("ESTA LOGUEADO");
      return true;
    }else{
      console.log("NO ESTA LOGUEADO");
      this._router.navigate(['/login']);
      return false;
    }
    
  }
}
