import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';
@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.scss']
})
export class ModalUploadComponent implements OnInit {


  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(
    public subirArchivo: SubirArchivoService,
    public _modalUploadS: ModalUploadService

  ) { }

  ngOnInit(): void {
    console.log('modal listo')
  }


  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;

      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal.fire({
        title: 'Imagen invalidad',
        text: "Seleccion una imagen valida",
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



  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadS.ocultarModal();
  }

  subirImagen() {
    this.subirArchivo.subirArchivo(this.imagenSubir, this._modalUploadS.tipo,
      this._modalUploadS.id).then(
        res => {
          console.log(res);
          this._modalUploadS.notification.emit(res);
          this.cerrarModal();
        }
      )
      .catch(err => {
        console.log('error en la carga')
      })
  }
}
