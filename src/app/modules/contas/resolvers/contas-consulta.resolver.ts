import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from '@angular/core';
import { Observable } from "rxjs";

import { Usuario } from "src/app/models/usuario.model";
import { BasePageable } from '../../../models/base-pageable.model';
import { Conta } from "src/app/models/conta.model";
import { ContasService } from "../services/contas.service";

export const ContasConsultaResolver: ResolveFn<BasePageable<Conta>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    service: ContasService = inject(ContasService)
): Observable<BasePageable<any>> => {
    return service.getAllPaginated();
};
