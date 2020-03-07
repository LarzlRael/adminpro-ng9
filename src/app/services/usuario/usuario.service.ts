import { Injectable } from '@angular/core';
import { Usuario } from 'models/usuario.model';
import { HttpClient } from '@angular/common/http'
import { uri_service } from 'src/app/config/config';
//librear de sweall alert2
import swal from 'sweetalert2';

import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  uri = uri_service;

  usuario: Usuario;

  token: string;

  menu: any = [];

  constructor(
    private http: HttpClient,
    public router: Router,
    public subirArchivoS: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  renuevaToken() {
    // http://localhost:3000/renuevaToken
    let url = uri_service + '/renuevaToken';
    return this.http.get(url).pipe(map(
      (res: any) => {
        this.token = res.token;
        console.log('token renovado')
        localStorage.setItem('token', this.token);
        return true;
      }))
  }


  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = null;
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
      }), catchError(this.handleErrorRegister))
  }


  handleErrorRegister(error) {
    console.log(error)
    const memsajeError = error.error.message;
    let errorMessage = '';

    swal.fire({
      title: 'Error',
      text: 'correo no disponible',
      icon: 'error'
    })
    return throwError(errorMessage);
  }



  // para poder hacer el recuerdame
  login(usuario, recodar: boolean) {

    if (recodar) {
      localStorage.setItem('email', usuario.email);

    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(`${this.uri}/login`, usuario)
      .pipe(map((res: any) => {
        console.log(res);
        this.guardarStorage(res.id, res.token, res.userdb, res.menu);
        return true
      }), catchError(this.handleErrorLogin))

  }

  // =================================|
  // metodo para ver el error  |
  // =================================|

  handleErrorLogin(error) {
    console.log(error.error.message)
    const memsajeError = error.error.message;
    let errorMessage = '';

    swal.fire({
      title: 'Error',
      text: memsajeError,
      icon: 'error'
    })
    return throwError(errorMessage);
  }

  //metodo para ingresar con google

  loginGoogle(token: string) {

    return this.http.post(`${this.uri}/google`, { token })
      .pipe(map((res: any) => {
        this.guardarStorage(res.id, res.token, res.userdb, res.menu);
        return true;
      }));

  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  estaLogeado() {
    return (this.token.length > 5) ? true : false;
  }
  logOut() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }


  // =================================|
  //  metodo para ver actualizar
  // =================================|

  actualizarUsuario(usuario: Usuario) {

    console.log('\nmostrando informacion de usuario', usuario)

    let url = this.uri + '/edit/' + this.usuario._id;


    return this.http.put(url, usuario).pipe(map((res: any) => {

      if (usuario._id === this.usuario._id) {
        let usuariodb: Usuario = res.usuario;
        this.guardarStorage(usuariodb._id, this.token, usuariodb, this.menu);
      }

      swal.fire({
        title: 'Se actualizo correctamente',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
      return true;
    }))
  }

  cambiarImage(archivo: File, id: string) {
    this.subirArchivoS.subirArchivo(archivo, 'usuarios', id).then(
      (res: any) => {
        console.log(res)
        this.usuario.img = res.usuario.img;
        swal.fire({
          title: 'Imagen Actualizada',
          icon: 'success',
          confirmButtonText: 'Cool'
        });
        this.guardarStorage(id, this.token, this.usuario, this.menu);
        console.log(res);
      }
    )
      .catch(err => {
        console.log(err);
      })
  }


  // =================================|
  // Metodo para obtener todos los uarios  |
  // =================================|
  cargarUsuarios(desde: number) {
    // http://localhost:3000/users?desde=0
    let url = uri_service + '/users?desde=' + desde;
    return this.http.get(url, {
      headers: {
        token: this.token
      }
    });
  }
  buscarUsuarios(termino: string) {
    // /coleccion/:tabla/:busqueda
    let url = uri_service + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url);
  }

  borrarUsuario(id) {
    let uri = uri_service + '/' + id;

    return this.http.delete(uri, {
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
    }))
  }
}
