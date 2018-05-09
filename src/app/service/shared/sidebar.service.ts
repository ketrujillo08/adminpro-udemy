import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu:any=[
    {
      titulo:"Principal",
      icono:"mdi mdi-gauge",
      subtitulos:[
        {titulo:'Dashboard',url:"/dashboard"},
        {titulo:'ProgressBar',url:"/progress"},
        {titulo:'Gráficas',url:"/graficas1"},
        {titulo:'Promesas',url:"/promesas"},
        {titulo:'RXJS',url:"/rxjs"}
      ]
    },
    {
      titulo:'Mantenimientos',
      icono:'mdi mdi-folder-lock-open',
      subtitulos:[
        {titulo:'Usuarios',url:"/usuarios"},
        {titulo:'Medicos',url:"/medicos"},
        {titulo:'Hospitales',url:"/hospitales"}
      ]
    }
  ];

  constructor() { }

}
