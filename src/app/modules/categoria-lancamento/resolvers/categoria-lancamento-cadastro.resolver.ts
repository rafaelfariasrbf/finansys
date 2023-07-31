import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Injectable, inject } from '@angular/core';
import { Observable, of } from "rxjs";

import { CategoriaLancamento } from "src/app/models/categoria-lancamento.model";
import { BasePageable } from "src/app/models/base-pageable.model";
import { CategoriaLancamentoService } from "../services/categoria-lancamento.service";

export const CategoriaLancamentoCadastroResolver: ResolveFn<BasePageable<CategoriaLancamento>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    service: CategoriaLancamentoService = inject(CategoriaLancamentoService)
): Observable<any> => {
    if(route.params && route.params['id']){
        return service.getById(route.params['id']);
    }
    return of({
        'id': null,
        'nome': null,
        'idade': null,
        'email': null
    });
};

