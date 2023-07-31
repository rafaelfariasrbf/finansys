import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { CategoriaLancamento } from 'src/app/models/categoria-lancamento.model';

import { environment } from 'src/environments/environment';
import { BasePageable } from '../../../models/base-pageable.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaLancamentoService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<CategoriaLancamento[]> {
        return this.http.get<CategoriaLancamento[]>(`${environment.API_URL}/categoria-lancamento/`).pipe(take(1));
    }

    getAllPaginated(params?: any): Observable<BasePageable<CategoriaLancamento>> {
        return this.http.get<BasePageable<CategoriaLancamento>>(
            `${environment.API_URL}/categoria-lancamento/paginated?`,
            { params: new HttpParams({ fromObject: params }) }
        );
    }

    getById(id: string): Observable<CategoriaLancamento> {
        return this.http.get<CategoriaLancamento>(`${environment.API_URL}/categoria-lancamento/${id}`).pipe(take(1));
    }

    private create(categoria: CategoriaLancamento) {
        return this.http.post(`${environment.API_URL}/categoria-lancamento/`, categoria).pipe(take(1));
    }

    private update(categoria: CategoriaLancamento) {
        return this.http.patch(`${environment.API_URL}/categoria-lancamento/${categoria.id}`, categoria).pipe(take(1));
    }

    save(categoria: CategoriaLancamento){
        if(categoria.id){
            return this.update(categoria);
        }
        return this.create(categoria);
    }

    delete(id: string) {
        return this.http.delete(`${environment.API_URL}/categoria-lancamento/${id}`).pipe(take(1));
    }
}
