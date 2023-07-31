import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './modules/auth/services/auth.service';
import { Usuario } from './models/usuario.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    user?: Usuario | null;

    constructor(private primengConfig: PrimeNGConfig, private authService: AuthService) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.authService.user.subscribe(data => this.user = data)
    }

    logout() {
        this.authService.logout();
    }
}
