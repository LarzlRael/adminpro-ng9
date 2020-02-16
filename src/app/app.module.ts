import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
//modulo de formulario (temporal)
import {FormsModule} from '@angular/forms'

// Modulos
import { PagesModule } from './pages/pages.module';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    
  ],
  imports: [
    PagesModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
