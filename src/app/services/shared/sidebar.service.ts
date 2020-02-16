import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }
  menu = [
    {
      titulo:"Principal",
      icono:"mdi mdi-gauge",
      submenu:[
        {titulo:'Dashboard',url:'/dashboard'},
        {titulo:'ProgressBar',url:'/progress'},
        {titulo:'Gráficas',url:'/grafica1'},
      ]
    }

  ]
}
