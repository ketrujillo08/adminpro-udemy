import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress:ElementRef;

  @Input() porcentaje : number = 50;
  @Input('nombre') leyenda:string="Leyenda";

  @Output() cambioValor:EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  onChanges(newValue:number){
    
    
    if(newValue >=100){
      this.porcentaje=100;
    }else if(newValue<=0){
      this.porcentaje=0;
    }else{
      this.porcentaje=newValue;
    }

    this.txtProgress.nativeElement.value = this.porcentaje;
    this.cambioValor.emit(this.porcentaje);
  }
  cambiarValor(valor){
    if(this.porcentaje>=100){
      this.porcentaje=100;
    }
    if(this.porcentaje <= 0){
      this.porcentaje=0;
    }
    this.porcentaje = this.porcentaje+valor;
    this.txtProgress.nativeElement.focus();
    
  }

}
