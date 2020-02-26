import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from './settings/settings.service';
import { SidebarService } from './shared/sidebar.service';
import { SharedService } from './shared/shared.service';
import { UsuarioService } from './usuario/usuario.service';

//serivicos http

import { HttpClientModule } from '@angular/common/http'
//sweet alert
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoginGuardGuard } from './guads/login-guard.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard
  ]
})
export class ServiceModule { }
