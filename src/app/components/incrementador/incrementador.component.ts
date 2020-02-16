import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  //hacer referencia a un elemento html para poder manejar su estados nativos
  @ViewChild('txtProgress') txtProgress: ElementRef;
  @Input('nombre') leyenda: string = '';
  @Input() progreso: number = null;
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  cambiarValor(valor) {
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
    } else if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
    }

    this.progreso = this.progreso - valor;
    this.cambioValor.emit(this.progreso);
  }

  onChange(newValue: number) {

    // let eleHTML: any = document.getElementsByName('progreso')[0];

    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    // eleHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();

  }
}
