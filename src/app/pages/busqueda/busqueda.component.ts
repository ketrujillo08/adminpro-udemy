import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Medico } from '../../models/medico.model';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  medicos : Medico[] = [];
  usuarios : Usuario[] = [];
  hospitales : Hospital[] = [];
  cargando : boolean = false;
  constructor(
    public _activatedRoute:ActivatedRoute,
    public _http : HttpClient,
    public _router : Router
  ) { 
    _activatedRoute.params.subscribe(params=>{
      let termino = params['termino'];
      this.buscar(termino);
    })
  }

  ngOnInit() {
    
  }

  buscar(termino:string){
    this.cargando=true;
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this._http.get(url).subscribe(
      (res:any)=>{
        this.hospitales = res.hospitales;
        this.usuarios = res.usuarios;
        this.medicos = res.medicos;
        this.cargando=false;

      }
    )
  }
  ir(termino : string , id :string){
      this._router.navigate(['/'+termino,id]);
  }

}
