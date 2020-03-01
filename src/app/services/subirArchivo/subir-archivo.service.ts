import { Injectable } from '@angular/core';
import { uri_service } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string) {

    console.log('serivicoi de subir archivo ACTIVO')

    return new Promise((resolve, rejects) => {

      let formData = new FormData();

      let xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
          if (xhr.status == 200) {
            console.log('imagen Subida');

            resolve(JSON.parse(xhr.response));
          } else {
            console.log('fallo la subida de archivo');
            rejects(JSON.parse(xhr.response));
          }

        }
      }

      let url = `${uri_service}/uploads/${tipo}/${id}`;

      xhr.open('PUT', url, true);
      xhr.send(formData);
    })

  }
}
