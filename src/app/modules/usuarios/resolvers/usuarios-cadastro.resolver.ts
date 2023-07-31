import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from "rxjs";

import { Usuario } from "src/app/models/usuario.model";
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
    providedIn: 'root'
})
export class UsuariosCadastroResolver implements Resolve<Usuario> {

    constructor(private usuariosService: UsuariosService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
        if(route.params && route.params['id']){
            return this.usuariosService.getById(route.params['id']);
        }
        return of({
                'id': null,
                'nome': null,
                'idade': null,
                'email': null
            });
    }
}
