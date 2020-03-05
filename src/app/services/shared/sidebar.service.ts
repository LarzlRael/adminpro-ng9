import { Injectable } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [];
  constructor(
    public usuarioService: UsuarioService
  ) {
    this.cargarMenu();
  }

  cargarMenu() {
    this.menu = this.usuarioService.menu;
  }
}
