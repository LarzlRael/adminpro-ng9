import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
    providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {

    constructor(private userService: UsuarioService) {

    }
    intercept(req, next) {
        const tokenzereq = req.clone({
            setHeaders: {
                token: this.userService.token
            }
        })


        return next.handle(tokenzereq)
    }

}
