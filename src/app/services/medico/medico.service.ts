import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { uri_service } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';

import swal from 'sweetalert2';
import { Medico } from 'models/medicos.model';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos = 0;
  constructor(public http: HttpClient,
    private userS: UsuarioService
    ,
  ) { }

  cargarMedicos() {
    //http://localhost:3000/medicos/medicos
    let url = uri_service + '/medicos/medicos/';
    return this.http.get(url, {
      headers: {
        token: this.userS.token
      }
    })
  }

  buscarMedico(termino: string) {
    let url = uri_service + '/busqueda/coleccion/medicos/' + termino;
    // busqueda/coleccion/usuarios/monchito
    return this.http.get(url).pipe(map((res: any) =>
      res.medicos
    ));
  }
  borrarMedico(id: string) {
    let url = uri_service + '/medicos/' + id;
    return this.http.delete(url, {
      headers: {
        token: this.userS.token
      }
    }).pipe(map(res => {
      swal.fire({
        title: 'Medico Borrado',

        icon: 'success'
      })
    }));
  }

  guardarMedico(medico: Medico) {
    // http://localhost:3000/medicos/add-medico
    let url = uri_service + '/medicos/add-medico';
    return this.http.post(url, medico,
      {
        headers: {
          token: this.userS.token
        }
      })
      .pipe(map(res => {
        swal.fire({
          title: 'Medico Creado' + medico.nombre,
          icon: 'success'
        })
        return res;
      }))
      ;
  }
}
