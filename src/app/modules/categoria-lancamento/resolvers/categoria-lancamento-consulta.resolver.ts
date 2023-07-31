import { CategoriaLancamento } from './../../../models/categoria-lancamento.model';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from '@angular/core';
import { Observable } from "rxjs";

import { CategoriaLancamentoService } from "../services/categoria-lancamento.service";
import { BasePageable } from '../../../models/base-pageable.model';

export const CategoriaLancamentoConsultaResolver: ResolveFn<BasePageable<CategoriaLancamento>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    service: CategoriaLancamentoService = inject(CategoriaLancamentoService)
): Observable<BasePageable<any>> => {
    return service.getAllPaginated();
};
