import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/service.index';
import { Medico } from 'models/medicos.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss']
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  totalMedicos = 0;
  constructor(
    private medicoS: MedicoService
  ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.medicoS.cargarMedicos().subscribe(
      (medicos: any) => {
        this.medicos = medicos.medicos;
        this.totalMedicos = medicos.total;
        console.log(medicos);
      },
      err => {
        console.log(err)
      }
    )
  }
  buscarMedico(termino: string) {

    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this.medicoS.buscarMedico(termino).subscribe(
      (res: any) => {
        this.medicos = res
      },

      err => {
        console.log(err)
      }
    )
  }

  borrarMedico(id: string) {
    this.medicoS.borrarMedico(id).subscribe(
      res => {
        this.cargarMedicos()
      },
      err => {
        console.log(err)
      }
    )
  }
}
