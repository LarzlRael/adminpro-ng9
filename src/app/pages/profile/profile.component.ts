import { Component, OnInit } from '@angular/core';
import { Usuario } from 'models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(
    public usuarioService: UsuarioService
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  guardar(usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;

    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    console.log('usuario que se va actualizar', this.usuario)
    this.usuarioService.actualizarUsuario(this.usuario).subscribe(
      res => {
        console.log(res)
      }, err => {
        console.log(err)
      }
    );
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;

      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal.fire({
        title: 'Imagen invalidad',
        text: "Seleccion una imagen validad",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    
    let reader = new FileReader();
    let urlImagenTempo = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  // =================================|
  // metodo para poder cambiar xd  |
  // =================================|
  CambiarImagen() {
    console.log('servicio para cambiar la imagen')
    this.usuarioService.cambiarImage(this.imagenSubir, this.usuario._id);
  }

}
