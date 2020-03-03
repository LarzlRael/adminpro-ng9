import { Pipe, PipeTransform } from '@angular/core';
import { uri_service } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {


    let url = uri_service + '/img';
    if (img.indexOf('https') >= 0) {
      return img;
    }
    if (!img) {
      return url + '/usuarios/xxx'
    }

    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img

        break;
      case 'medico':

        url += '/medicos/' + img
        break;

      case 'hospital':
        url += '/hospitales/' + img
        break;

      default:
        console.log('tipo de imagen no existe, solo usuario ,medico ,hospitales');
        url += '/usuarios/xxx';

    }
    return url;
  }

}
