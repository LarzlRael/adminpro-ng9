import { Injectable } from '@angular/core';
import { Usuario } from 'models/usuario.model';
import { HttpClient } from '@angular/common/http'
import { uri_service } from 'src/app/config/config';
//librear de sweall alert2
import swal from 'sweetalert2';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  uri = uri_service;

  usuario: Usuario;

  token: string;



  constructor(
    private http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }
  crearUsuario(usuario: Usuario) {
    const uri = `${this.uri}/add-user`;
    console.log('haciendo peiticion a ', uri);
    // swal('Registro exitoso...', this.titularAlerta, 'success');
    swal.fire({
      title: 'Registro!',
      text: `Usuario ${usuario.email} registrado`,
      icon: 'success',
      confirmButtonText: 'Cool'
    })
    return this.http.post(`${this.uri}/add-user`, usuario)
      .pipe(map((res: any) => {
        return res.usuario
      }))
  }

  //para poder hacer el recuerdame
  login(usuario, recodar: boolean) {

    if (recodar) {
      localStorage.setItem('email', usuario.email);

    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(`${this.uri}/login`, usuario)
      .pipe(map((res: any) => {
        this.guardarStorage(res.id, res.token, res.userdb);
        return true
      }));
  }


  //metodo para ingresar con google

  loginGoogle(token: string) {
    return this.http.post(`${this.uri}/google`, { token })
      .pipe(map((res: any) => {
        this.guardarStorage(res.id, res.token, res.userdb);
      }));

  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  estaLogeado() {
    return (this.token.length > 5) ? true : false;
  }
  logOut() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
