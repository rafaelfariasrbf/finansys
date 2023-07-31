import { Usuario } from 'src/app/models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, take } from 'rxjs';

import { environment } from 'src/environments/environment';
import { BasePageable } from '../../../models/base-pageable.model';

@Injectable({
    providedIn: 'root',
})
export class UsuariosService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(`${environment.API_URL}/users/`);
    }

    getAllPaginated(params?: any): Observable<BasePageable<Usuario>> {
        return this.http.get<BasePageable<Usuario>>(
            `${environment.API_URL}/users/paginated?`,
            { params: new HttpParams({ fromObject: params }) }
        );
    }

    getById(id: string): Observable<Usuario> {
        return this.http.get<Usuario>(`${environment.API_URL}/users/${id}`).pipe(take(1));
    }

    private create(usuario: Usuario) {
        return this.http.post(`${environment.API_URL}/users/`, usuario).pipe(take(1));
    }

    private update(usuario: Usuario) {
        return this.http.patch(`${environment.API_URL}/users/${usuario.id}`, usuario).pipe(take(1));
    }

    save(usuario: Usuario){
        console.log(usuario);

        if(usuario.id){
            return this.update(usuario);
        }
        return this.create(usuario);
    }

    delete(id: string) {
        return this.http.delete(`${environment.API_URL}/users/${id}`).pipe(take(1));
    }
}
