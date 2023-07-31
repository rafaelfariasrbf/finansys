import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, take } from 'rxjs';

import { environment } from 'src/environments/environment';
import { BasePageable } from '../../../models/base-pageable.model';
import { Lancamento } from 'src/app/models/lancamento.model';
import { Transacao } from 'src/app/enums/transacao.enum';

@Injectable({
    providedIn: 'root'
})
export class LancamentoService {
    URL = `${environment.API_URL}/lancamento`;

    constructor(private http: HttpClient) {}

    getAll(
        transacao: string,
        params?: any
    ): Observable<BasePageable<Lancamento>> {
        if (!params) {
            params = { 'filter.transacao': transacao };
        }
        return this.http.get<BasePageable<Lancamento>>(`${this.URL}/?`, {
            params: new HttpParams({ fromObject: params })
        });
    }

    getById(id: string): Observable<Lancamento> {
        return this.http.get<Lancamento>(`${this.URL}/${id}`).pipe(take(1));
    }

    private create(lancamento: Lancamento) {
        return this.http.post(this.URL, lancamento).pipe(take(1));
    }

    private update(lancamento: Lancamento) {
        return this.http
            .patch(`${this.URL}/${lancamento.id}`, lancamento)
            .pipe(take(1));
    }

    save(lancamento: Lancamento) {
        if (lancamento.id) {
            return this.update(lancamento);
        }
        return this.create(lancamento);
    }

    delete(id: string) {
        return this.http.delete(`${this.URL}/${id}`).pipe(take(1));
    }
}
