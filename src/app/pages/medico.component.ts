import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'models/hospital.model';
import { HospitalService } from '../services/hospitales/hospital.service';
import { Medico } from 'models/medicos.model';
import { MedicoService } from '../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.scss']
})
export class MedicoComponent implements OnInit {

  medico: Medico = new Medico('', '', '', '', '');


  constructor(
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    public router: Router,
    private activateRoute: ActivatedRoute,
    public _modalUploadS: ModalUploadService
  ) {
    this.activateRoute.params.subscribe(params => {

      let id = params['id'];
      console.log('\nid del medico ' + id)
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }

    })
  }

  hospitals: Hospital[] = [];
  hospital: Hospital = new Hospital('', '');
  ngOnInit(): void {
    this.hospitalService.getHospitals().subscribe(
      (hospital: any) => {
        this.hospitals = hospital.Hospital;
        console.log(this.hospitals)
      }
    );

    this._modalUploadS.notification.subscribe(
      resp => {
        this.medico.img = resp.medicoActualizado.img
      },
      err => {
        console.log(err)
      }
    )
  }

  guadarMedico(form: NgForm) {
    console.log(this.medico);
    if (form.invalid) {
      return;
    }

    this.medicoService.guardarMedico(this.medico).subscribe(
      (medico: any) => {
        console.log(medico);
        const id = medico.newMedico._id;
        this.medico._id = id;
        this.router.navigate(['/medico', id])
      },
      err => {
        console.log(err)
      }
    )
  }


  cambioHospital(id: string) {
    console.log('evento de cambio de hospital')
    this.hospitalService.obtenerHospital(id).subscribe(
      (res: any) => {
        this.hospital = res.hospital;
        console.log(this.hospital)
      },
    )
  }

  cargarMedico(id: string) {
    this.medicoService.cargarMedico(id).subscribe(
      (res: any) => {
        this.medico = res;
        this.medico.hospital = res.hospital._id;
        this.cambioHospital(this.medico.hospital);
        console.log(this.medico);
      },
      err => {
        console.log(err)
      }
    )
  };

  cambiarFoto() {
    this._modalUploadS.mostrarModal('medicos', this.medico._id);
  }
}
