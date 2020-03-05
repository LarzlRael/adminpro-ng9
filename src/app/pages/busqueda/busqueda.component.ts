import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { uri_service } from './../../config/config';
import { Usuario } from './../../../../models/usuario.model';
import { Medico } from './../../../../models/medicos.model';
import { Hospital } from './../../../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];



  constructor(
    private activateRouter: ActivatedRoute,
    private httpclient: HttpClient,

  ) {
    this.activateRouter.params.subscribe(params => {
      let termino = params['termino'];
      console.log(termino);
      this.buscar(termino);
    })
  }

  ngOnInit(): void {

  }

  buscar(termino: string) {
    /* http://localhost:3000/busqueda/todo/busqueda */
    let url = uri_service + '/busqueda/todo/' + termino;
    this.httpclient.get(url).subscribe(
      (resp: any) => {
        console.log(resp);
        this.hospitales = resp.hospitales;
        this.medicos = resp.medicos;
        this.usuarios = resp.usuarios;
      },
      err => {
        console.log(err);
      }
    )
  }

}
