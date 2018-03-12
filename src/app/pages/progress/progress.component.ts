import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progreso1:number = 20;
  progreso2:number = 50;

  constructor() { }

  ngOnInit() {
  }

  actualizar(event:number,valor:number){
    switch(valor){
      case 1:
        this.progreso1=event;
      return;
      case 2:
        this.progreso2=event;
      return;
    }
  }

 

}
