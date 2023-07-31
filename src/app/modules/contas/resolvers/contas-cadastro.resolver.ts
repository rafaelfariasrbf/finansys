import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from "rxjs";

import { Usuario } from "src/app/models/usuario.model";
import { ContasService } from "../services/contas.service";

@Injectable({
    providedIn: 'root'
})
export class ContasCadastroResolver implements Resolve<Usuario> {

    constructor(private contasService: ContasService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
        if(route.params && route.params['id']){
            return this.contasService.getById(route.params['id']);
        }
        return of({
                'id': null,
                'nome': null,
            });
    }
}
