import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { uri_service } from 'src/app/config/config';
import { Hospital } from 'models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token = localStorage.getItem('token');
  constructor(private http: HttpClient,
    public userSer: UsuarioService
  ) { }

  crearHospital(nombre: string) {
    let url = uri_service + '/hospital/add-hospital';
    return this.http.post(url, { nombre }, {
      headers: {
        token: this.userSer.token
      }
    })
      .pipe(map((res: any) => {
        res.hospital
      }));
  }

  getHospitals() {
    let url = uri_service + '/hospital/hospitales'
    return this.http.get(url, {
      headers: {
        token: this.token
      }
    });
  }

  borrarHospital(id: string) {
    // http://localhost:3000/hospital/5e4c53dd71f0a33f93916173
    let url = uri_service + '/hospital/' + id
    return this.http.delete(url, {
      headers: {
        token: this.token
      }
    }).pipe(map(resp => {
      swal.fire({
        title: 'Usuario borrado',
        text: `Usuario borrado satisfactoariemente`,
        icon: 'success',
        confirmButtonText: 'Cool'
      })
      return true;
    }));
  }

  editarHospital(hospital: Hospital) {
    //http://localhost:3000/hospital/edit/5e5bfd8b5bb9a913c048a8e7
    console.log('hospital recibido', hospital)
    let url = uri_service + '/hospital/edit/' + hospital._id;
    return this.http.put(url, { nombre: hospital.nombre }, {
      headers: {
        token: this.userSer.token
      }
    }).pipe(map(res => {

      swal.fire({
        title: 'Se actualizo correctamente',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
      return true;
    }));

  }

  buscarHospital(termino: string) {
    let url = uri_service + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url);
  }

  obtenerHospital(id: string) {
    //http://localhost:3000/hospital/5e5bf1abc14b3b0cc5637ae8
    let url = uri_service + /hospital/ + id
    return this.http.get(url, {
      headers: {
        token: this.userSer.token
      }
    });
  }
  
}
