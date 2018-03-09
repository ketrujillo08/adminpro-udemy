import { NgModule } from "@angular/core";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
    declarations:[
        BreadcrumbsComponent,
        FooterComponent,
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent
    ],
    exports:[
        BreadcrumbsComponent,
        FooterComponent,
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent
    ]
})

export class SharedModule{}