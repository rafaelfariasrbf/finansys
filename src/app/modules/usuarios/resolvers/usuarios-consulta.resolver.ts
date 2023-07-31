import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from '@angular/core';
import { Observable } from "rxjs";

import { Usuario } from "src/app/models/usuario.model";
import { UsuariosService } from "../services/usuarios.service";
import { BasePageable } from '../../../models/base-pageable.model';

export const UsuariosConsultaResolver: ResolveFn<BasePageable<Usuario>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    usuariosService: UsuariosService = inject(UsuariosService)
): Observable<BasePageable<any>> => {
    return usuariosService.getAllPaginated();
};
