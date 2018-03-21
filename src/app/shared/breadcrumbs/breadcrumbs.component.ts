import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  label:string = "";
  constructor(private _router:Router,public title:Title,public meta:Meta) {
    this.getDataRoute()
    .subscribe(data => {
      this.label=data;
      this.title.setTitle(data);
      let  metaTag:MetaDefinition={
        name:"description",content:this.label
      };
      this.meta.updateTag(metaTag);
    });
   }

   getDataRoute(){
    return this._router.events
    .filter(evento => evento instanceof ActivationEnd)
    .filter((evento:ActivationEnd) => evento.snapshot.firstChild ===null)
    .map((event:ActivationEnd) => event.snapshot.data.titulo);
   }
  ngOnInit() {
  }

}
