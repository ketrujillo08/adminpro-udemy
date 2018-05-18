import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';
import { reject } from 'q';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(public _usuarioService:UsuarioService){
   
  }
  canActivate(): Promise<boolean> | boolean {
    let token = this._usuarioService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));
    let expirado = this.expirado(payload.exp);

    if(expirado){
      this._usuarioService.logOut();
      return false;
    }
    this.verificaRenueva(payload.exp);
    return true;
  }
  verificaRenueva(fechaExp : number):Promise<boolean>{

    return new Promise((resolve,reject)=>{
      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();
      ahora.setTime(ahora.getTime() + (4*60*60*1000));

      if(tokenExp.getTime() > ahora.getTime() ){
        resolve(true);
      }else{
        this._usuarioService.renuevaToken()
        .subscribe(
          ()=>{
            resolve(true);
          },
          ()=>{
            reject(false);
            this._usuarioService.logOut();
          }
      );
        
      }
      
      resolve(true);
    });
  }
  expirado(fechaExp : number){
    let hora = new Date().getTime() / 1000;
    if(fechaExp < hora){
      return true;
    }else{
      return false;
    }
  }
}
