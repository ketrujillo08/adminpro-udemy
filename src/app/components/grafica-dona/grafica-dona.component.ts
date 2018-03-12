import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styles: []
})
export class GraficaDonaComponent implements OnInit {
 @Input() datos:number[];
 @Input() etiquetas:string[];
 @Input() tipo:string;
 @Input() leyenda:string;

  constructor() { }
  
  ngOnInit() {
  }

}
