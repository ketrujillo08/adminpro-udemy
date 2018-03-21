import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit,OnDestroy{

  subscription:Subscription;
  constructor() {
        
    
    //Calback para el NEXT
    this.subscription = this.regresaObservable()
    .subscribe(
      numero=>console.log('Subs',numero),
      error=>console.error('Error en el obs',error),
      ()=>console.log("El observador Termino")
    
    );

   }

  ngOnInit() {
  }
  ngOnDestroy() {
    console.log("Cerrando Página");
    this.subscription.unsubscribe();
    
  }

  regresaObservable():Observable<any>{
    return new Observable(observer =>{  
      let contador = 0;
      let intervalo = setInterval(()=>{
        contador+=1;

        let salida = {
          valor:contador
        }
        observer.next(salida); //Notificamos cada que se envie el contador
        
        /*if(contador === 3 ){
          clearInterval(intervalo);
          observer.complete();
        }*/

        /*if(contador===2){
          clearInterval(intervalo);
          observer.error("Recibi un 2");
        }*/

      },500);
    }).retry(2)
    .map((res:any)=>{
      return res.valor;
    })
    .filter((valor,index)=>{
      if(valor % 2 === 1){
        //impar
        return true;
      }else{
        //para
        return false;
      }
     
    });

   
  }

}
