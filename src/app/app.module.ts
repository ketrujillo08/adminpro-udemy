import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

//Rutas
import { APP_ROUTES } from './app.route';
import { RegisterComponent } from './register/register.component';


import { PagesModule } from './pages/pages.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceModule } from './service/service.module';
import { SettingsService } from './service/settings/settings.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent 
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  providers: [SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
