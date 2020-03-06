import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from './settings/settings.service';
import { SidebarService } from './shared/sidebar.service';
import { SharedService } from './shared/shared.service';
import { UsuarioService } from './usuario/usuario.service';

//serivicos http

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
//sweet alert
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SubirArchivoService } from './subirArchivo/subir-archivo.service';

import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalService } from './hospitales/hospital.service';
import { MedicoService } from './medico/medico.service';
import { TokenInterceptor } from './token_interceptor/token_interceptor.service';


import { LoginGuardGuard } from './guads/login-guard.guard';
import { AdminGuard } from './guards/admin.guard';


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
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    LoginGuardGuard,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class ServiceModule { }
