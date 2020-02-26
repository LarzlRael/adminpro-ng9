import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as swal from 'sweetalert'
import { UsuarioService } from '../services/service.index';
import { Usuario } from 'models/usuario.model';
import { Router } from '@angular/router';
declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    private usuario_service: UsuarioService,
    private router:Router

  ) { }

  sonIguales(campo1: string, campo2: string) {



    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 == pass2) {
        return null;
      }
      return {
        sonIguales: true
      }
    }
  }

  ngOnInit(): void {
    init_plugins();
    this.forma = new FormGroup({
      nombre: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
      condiciones: new FormControl(false),
    }, { validators: this.sonIguales('password', 'password2') });


    this.forma.setValue({
      nombre: 'Test',
      correo: 'rey@gmail.com',
      password: '123',
      password2: '123',
      condiciones: true
    })
  }


  registarUsuario() {
    console.log('formulario valido', this.forma.valid);

    if (this.forma.invalid) {
      return;
    }
    if (!this.forma.value.condiciones) {
      console.log('\ndebe aceptar las condiciones');
      
      return
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
    );

    this.usuario_service.crearUsuario(usuario).subscribe(
      user => {
        //console.log(user),
        this.router.navigate(['/login'])
      },
      err => {
        console.log(err)
      }
    )


  }

}
