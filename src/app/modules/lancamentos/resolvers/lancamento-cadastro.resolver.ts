import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Injectable, inject } from '@angular/core';
import { Observable, of } from "rxjs";

import { CategoriaLancamento } from "src/app/models/categoria-lancamento.model";
import { BasePageable } from "src/app/models/base-pageable.model";
import { LancamentoService } from "../services/lancamento.service";
import { Lancamento } from "src/app/models/lancamento.model";

export const LancamentoCadastroResolver: ResolveFn<BasePageable<Lancamento>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    service: LancamentoService = inject(LancamentoService)
): Observable<any> => {
    if(route.params && route.params['id']){
        return service.getById(route.params['id']);
    }
    return of({
        id: null,
        descricao: null,
        valor: null,
        transacao: null,
        categoriaLancamento: null,
        usuario: null,
        data: null
    });
};

