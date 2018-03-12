import { NgModule } from '@angular/core';
import { GraficaDonaComponent } from './grafica-dona/grafica-dona.component';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GraficaDonaComponent,
    IncrementadorComponent
  ],
  exports:[
    GraficaDonaComponent,
    IncrementadorComponent
  ],
  imports:[ChartsModule,FormsModule]
 
})
export class ComponentsModule { }
