import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospitales/hospital.service';

import Swal from 'sweetalert2'
import { Hospital } from 'models/hospital.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.scss']
})
export class HospitalesComponent implements OnInit {

  total_registros = 0;
  hospitales: any[] = [];

  New_hospital = {
    nombre: '',
    id_user: ''
  }

  constructor(public hospitalService: HospitalService,
    public modalSer: ModalUploadService) { }

  ngOnInit(): void {
    this.getHospitales();
    this.modalSer.notification.subscribe(() => this.getHospitales());
  }

  getHospitales() {
    this.hospitalService.getHospitals().subscribe(
      (res: any) => {
        this.hospitales = res.Hospital;
        console.log(this.hospitales);
        this.total_registros = res.total
      },
      err => {
        console.log(err)
      }
    )
  }

  // =================================|
  // Metodos para el mantenimiento de hospitales  |
  // =================================|

  crearHospital() {

    Swal.fire({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      icon: 'info',
      input: 'text',

    }).then((valor) => {
      if (valor.value) {
        this.hospitalService.crearHospital(valor.value).subscribe(
          res => {
            console.log(res),
              this.getHospitales()
          },
          err => {
            console.log(err)
          }
        )
      }
    })
  }


  borrarHospital(hospital: Hospital) {
    console.log('esto se va a borrar prro');
    this.hospitalService.borrarHospital(hospital._id).subscribe(
      res => {
        this.getHospitales();
      }, err => {
        console.log(err)
      }
    )
  }

  editarHospital(hospital: Hospital) {

    this.hospitalService.editarHospital(hospital).subscribe(
      res => {
        console.log(res)
        this.getHospitales()
      },
      err => {
        console.log(err)
      }
    )
  }
  buscarTermino(termino: string) {

    if (termino.length <= 0) {
      this.getHospitales();
      return;
    }

    this.hospitalService.buscarHospital(termino).subscribe(
      (res: any) => {
        this.hospitales = res.hospitales
      },
      err => {
        console.log(err)
      }
    )
  }

  actualizarImagen(hospital: Hospital) {
    this.modalSer.mostrarModal('hospitales', hospital._id);
  }
}
