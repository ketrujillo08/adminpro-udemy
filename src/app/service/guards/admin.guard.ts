import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(public _usuarioService : UsuarioService,public _router : Router){

  }
  canActivate() {

    if(this._usuarioService.usuario.rol === 'ADMIN_ROLE'){
      return true;
    }else{
      console.log('Bloqueado por GUARD');
      this._router.navigate(['/login']);
      return false;
    }

    
  }
}
