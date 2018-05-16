import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService,SidebarService,SharedService,UsuarioService,LoginGuardGuard,SubirArchivoService,HospitalService,MedicoService,AdminGuard } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUpService } from '../components/modal-up/modal-up.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUpService,
    HospitalService,
    MedicoService,
    AdminGuard],
  declarations: []
})
export class ServiceModule { }
