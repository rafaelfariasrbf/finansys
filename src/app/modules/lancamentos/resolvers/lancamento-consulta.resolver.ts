import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

import { LancamentoService } from "../services/lancamento.service";
import { BasePageable } from '../../../models/base-pageable.model';
import { Lancamento } from 'src/app/models/lancamento.model';
import { Transacao } from "src/app/enums/transacao.enum";

export const LancamentoConsultaResolver: ResolveFn<BasePageable<Lancamento>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    service: LancamentoService = inject(LancamentoService)
): Observable<any> => {
    return forkJoin({
        Lancamentos: service.getAll(Transacao.ENTRADA),
        LancamentosSaida: service.getAll(Transacao.SAIDA)
    });
};
