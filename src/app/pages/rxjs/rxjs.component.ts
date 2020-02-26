import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
    let contador = 0;
    let obs = new Observable(observer => {

      let intervalo = setInterval(() => {
        contador++;
        observer.next(contador);
        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (contador == 2) {
          observer.error('Auxilio');
        }
      }, 1000)
    });

    // la primera parte de es un next
    // el segundo es un error
    obs.subscribe(numero => console.log('subscripcion', numero),
      err => console.log(err),
      () => console.log('El observador termindo')
    )
  }

  ngOnInit(): void {
  }

}
