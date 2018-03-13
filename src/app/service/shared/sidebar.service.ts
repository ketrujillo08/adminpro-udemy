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
      ]
    }
  ]

  constructor() { }

}
