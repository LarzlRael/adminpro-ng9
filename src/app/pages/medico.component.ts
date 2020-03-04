import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'models/hospital.model';
import { HospitalService } from '../services/hospitales/hospital.service';
import { Medico } from 'models/medicos.model';
import { MedicoService } from '../services/service.index';
import { Router } from '@angular/router';

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
    public router: Router
  ) { }

  hospitals: Hospital[] = [];
  hospital: Hospital = new Hospital('', '');
  ngOnInit(): void {
    this.hospitalService.getHospitals().subscribe(
      (hospital: any) => {
        this.hospitals = hospital.Hospital;
        console.log(this.hospitals)
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
        this.router.navigate(['/medico', medico._id])
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
}
