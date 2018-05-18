import { NgModule } from "@angular/core";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUpComponent } from "../components/modal-up/modal-up.component";

@NgModule({
    imports:[RouterModule,CommonModule,PipesModule],
    declarations:[
        BreadcrumbsComponent,
        FooterComponent,
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent,
        ModalUpComponent
    ],
    exports:[
        BreadcrumbsComponent,
        FooterComponent,
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent,
        ModalUpComponent
    ]
})

export class SharedModule{}