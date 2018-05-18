import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { LoginGuardGuard,VerificaTokenGuard } from '../service/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../service/guards/admin.guard';

const pagesRoutes:Routes = [
            {path:'dashboard',component:DashboardComponent,canActivate:[VerificaTokenGuard],data:{titulo:'Dashboard'}},
            {path:'profile',component:ProfileComponent,data:{titulo:'Perfil de usuario'}},
            {path:'busqueda/:termino',component:BusquedaComponent,data:{titulo:'Buscador'}},
            {path:'progress',component:ProgressComponent,data:{titulo:'ProgressBars'}},
            {path:'graficas1',component:Graficas1Component,data:{titulo:'Graficas'}},
            {path:'promesas',component:PromesasComponent,data:{titulo:'Promesas'}},
            {path:'rxjs',component:RxjsComponent,data:{titulo:'RXJS'}},
            {path:'account-settings',component:AccountSettingsComponent,data:{titulo:'Perfil'}},
            //Mantenimientos
            {path:'usuarios',component:UsuariosComponent,data:{titulo:'Mantenimiento de usuarios'},canActivate:[AdminGuard]},
            {path:'hospitales',component:HospitalesComponent,data:{titulo:'Mantenimiento de hospitales'}},
            {path:'medicos',component:MedicosComponent,data:{titulo:'Mantenimiento de medicos'}},
            {path:'medico/:id',component:MedicoComponent,data:{titulo:'Mantenimiento del medico'}},
            {path:'',redirectTo:'/dashboard',pathMatch:'full'}
]
export const Pages_Routes = RouterModule.forChild(pagesRoutes);