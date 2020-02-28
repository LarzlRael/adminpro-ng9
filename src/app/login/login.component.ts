import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';

// usando una funcion de jquery que esta en otro archivo

declare function init_plugins();
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth2: any;

  recuerdame: boolean = false;
  user = {
    email: '',
    password: ''
  }
  constructor(
    private route: Router,
    private userService: UsuarioService
  ) {
  }

  //google api

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1030401634906-tn8v30rctfa8nmdp3u56o7isfhm7vlb7.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'))

    })
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      let profile = googleUser.getBasicProfile();
      //console.log(profile)

      let token = googleUser.getAuthResponse().id_token;
      
      this.userService.loginGoogle(token).subscribe(
        res => { window.location.href = '#/dashboard' }
        ,
        err => {
          console.log(err)
        }
      )
    })
  }

  ngOnInit(): void {
    init_plugins();
    this.user.email = localStorage.getItem('email') || '';
    if (this.user.email.length > 1) {
      this.recuerdame = true;
    }
    this.googleInit();
  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    console.log(forma.value);
    // this.route.navigate(['/dashboard']);
    this.userService.login(this.user, this.recuerdame).subscribe(
      correct => this.route.navigate([('/dashboard')]),
      err => {
        console.log(err)
      }
    )

  }
}
