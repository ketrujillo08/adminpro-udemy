import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../service/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame:boolean;
  email:string;
  auth2:any;
  constructor(public router:Router,public _usuarioService:UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if(this.email.length>1){
      this.recuerdame=true;
    }
    this.googleInit();
  }

  googleInit(){
    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({
        client_id:'461670666022-4t54ev7b4bvh1chk9qm4l3nu56t0esch.apps.googleusercontent.com',
        cookiepolicy:'single_host_origin',
        scope:'profile email'
      });
      this.attachSignIn(document.getElementById('btn-google'));
      
    });
  }

  attachSignIn(element){
    this.auth2.attachClickHandler(element,{},(googleUser)=>{
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token)
      .subscribe(
       ()=>{
             window.location.href="#/dashboard";
            //this.router.navigate(['/dashboard']);
          }
        
      );
    });
  }

  ingresar(forma:NgForm){
    
    if(!forma.valid){
      return;
    }
    let usuario = new Usuario(null,forma.value.email,forma.value.password);

    this._usuarioService.login(usuario,this.recuerdame)
    .subscribe(res=>{
      this.router.navigate(["/dashboard"]);
    });
    //this.router.navigate(["/dashboard"]);
  }

}
