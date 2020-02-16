import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Ajustes = {
    tema: 'assets/css/colors/default-dark.css',
    temaUrl: 'default-dark.css'
  }

  constructor(
    @Inject(DOCUMENT) private _document,
  ) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    console.log('guardando en el local storegag')
    localStorage.setItem('ajustes', JSON.stringify(this.settings))
  }
  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.settings = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.settings.tema);
    } else {
      console.log('usando valores por defecto')
      this.aplicarTema(this.settings.tema);
    }
  }
  aplicarTema(tema: string) {
    let url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('theme').setAttribute('href', url);
    console.log(tema)
    this.settings.tema = tema;
    this.settings.temaUrl = url;
    this.guardarAjustes();
  }
}


interface Ajustes {
  temaUrl: string,
  tema: string
}