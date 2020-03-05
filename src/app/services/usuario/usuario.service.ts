import { Injectable } from '@angular/core';
import { Usuario } from 'models/usuario.model';
import { HttpClient } from '@angular/common/http'
import { uri_service } from 'src/app/config/config';
//librear de sweall alert2
import swal from 'sweetalert2';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
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
      }))
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
      }));
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

    let url = this.uri + '/edit/' + this.usuario._id;
    console.log('\n\nhaciendo petiticion a ' + url)

    console.log('mostrandio informacion de usuario', usuario)

    return this.http.put(url, usuario, {
      headers: {
        token: this.token
      }
    }).pipe(map((res: any) => {

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
    console.log('\nusuario cambiar imagen service ACTIVO')
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
