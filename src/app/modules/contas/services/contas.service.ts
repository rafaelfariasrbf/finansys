import { Usuario } from 'src/app/models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, take } from 'rxjs';

import { environment } from 'src/environments/environment';
import { BasePageable } from '../../../models/base-pageable.model';
import { Conta } from 'src/app/models/conta.model';

@Injectable({
    providedIn: 'root',
})
export class ContasService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<Conta[]> {
        return this.http.get<Conta[]>(`${environment.API_URL}/contas/`);
    }

    getAllPaginated(params?: any): Observable<BasePageable<Conta>> {
        return this.http.get<BasePageable<Conta>>(
            `${environment.API_URL}/contas/?`,
            { params: new HttpParams({ fromObject: params }) }
        );
    }

    getById(id: string): Observable<Conta> {
        return this.http.get<Conta>(`${environment.API_URL}/contas/${id}`).pipe(take(1));
    }

    private create(conta: Conta) {
        return this.http.post(`${environment.API_URL}/contas/`, conta).pipe(take(1));
    }

    private update(conta: Conta) {
        return this.http.patch(`${environment.API_URL}/contas/${conta.id}`, conta).pipe(take(1));
    }

    save(conta: Conta){
        //console.log(conta);

        if(conta.id){
            return this.update(conta);
        }
        return this.create(conta);
    }

    delete(id: string) {
        return this.http.delete(`${environment.API_URL}/contas/${id}`).pipe(take(1));
    }
}
