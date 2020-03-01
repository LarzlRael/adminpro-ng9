import { Component, OnInit } from '@angular/core';
import { Usuario } from 'models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {


  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros = 0;
  cargando: boolean = false;
  constructor(
    public usService: UsuarioService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.modalUploadService.notification.subscribe(
      res => {
        this.cargarUsuarios();
      })
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.usService.cargarUsuarios(this.desde).subscribe(
      (res: any) => {
        this.usuarios = res.users;
        this.totalRegistros = res.total;
        console.log(this.usuarios)
        this.cargando = false;
      },
      err => {
        err
      }
    )
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    console.log(desde);
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  // =================================|
  // Metodo para buscar  |
  // =================================|

  buscarTermino(termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    console.log(termino);
    this.usService.buscarUsuarios(termino)
      .subscribe((users: any) => {
        console.log(users)
        this.usuarios = users.usuarios;
      },
        err => {
          console.log(err)
        }

      )

  }

  borrarUsuario(usuario: Usuario) {
    console.log(usuario);
    if (usuario._id === this.usService.usuario._id) {
      swal.fire({
        icon: 'error',
        title: 'No puedes eliminar',
        text: 'No puedes borrarte a si mismo',
      });
      return;
    }

    swal.fire({
      title: 'Esta seguro de Eliminar',
      text: "Esta seguro que quiere eliminar a " + usuario.email,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((borrar) => {

      if (borrar == true) {
        this.usService.borrarUsuario(usuario._id)
          .subscribe(resp => {
            console.log(resp);
            this.cargarUsuarios();
          })
      } else {
        return;
      }
    })
  }

  guardarUsuario(usuario: Usuario) {

    this.usService.actualizarUsuario(usuario).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

}
