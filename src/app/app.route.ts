import { Routes, RouterModule } from "@angular/router/";
import { LoginComponent } from "./login/login.component";
import { ProgressComponent } from "./pages/progress/progress.component";
import { NopagefoundComponent } from "./shared/nopagefound/nopagefound.component";
import { RegisterComponent } from "./register/register.component";

const appRoutes : Routes = [
    
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'**',component:NopagefoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes,{useHash:true});