import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { promise } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {


  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {

  }

  canActivate(): Promise<boolean> | boolean {
    console.log('\n\ntoken guard de verifica token')

    let token = this._usuarioService.token;
    let payload = JSON.parse(atob(token.split('.')[1]))
    console.log('\n\npayload', payload);

    let expirado = this.expirado(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    } else {

    }



    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let tokenExp = new Date(fechaExp * 1000)

      let ahora = new Date();

      //controlar por el tiempo que lleva el token
      ahora.setTime(ahora.getTime() + (4 * 60 * 60 * 1000));

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this._usuarioService.renuevaToken()
          .subscribe(
            () => {
              resolve(true)
            },
            () => {
              reject(false);
              this.router.navigate(['/login']);
            }
          )
      }

      resolve(true);
    });
  }


  expirado(fechaExp: number) {
    let ahora = new Date().getTime() / 1000;

    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }
  }
}
