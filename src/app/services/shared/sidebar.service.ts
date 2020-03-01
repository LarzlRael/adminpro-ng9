import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }
  menu = [
    {
      titulo: "Principal",
      icono: "mdi mdi-gauge",
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'ProgressBar', url: '/progress' },
        { titulo: 'Gráficas', url: '/grafica1' },
        { titulo: 'RXJS', url: '/rxjs' },
      ]
    },
    {
      titulo: "Mantenimiento",
      icono: "mdi mdi-folder-lock-open",
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Hosptiales', url: '/hospitales' },
        { titulo: 'Medicos', url: '/medicos' },
      ]
    },


  ]
}
