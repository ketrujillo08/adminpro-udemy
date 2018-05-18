import { Routes, RouterModule } from "@angular/router/";
import { LoginComponent } from "./login/login.component";
import { ProgressComponent } from "./pages/progress/progress.component";
import { NopagefoundComponent } from "./shared/nopagefound/nopagefound.component";
import { RegisterComponent } from "./register/register.component";
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from "./service/service.index";

const appRoutes : Routes = [
    
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {
        path:'',
        component:PagesComponent,
        canActivate:[LoginGuardGuard],
        loadChildren:'./pages/pages.module#PagesModule'
    }
    ,
    {path:'**',component:NopagefoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes,{useHash:true});