import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Sistema',
                items: [
                    { label: 'Usuários', icon: 'pi pi-fw pi-users', routerLink: ['/usuarios'] },
                    { label: 'Lançamento', icon: 'pi pi-fw pi-users', routerLink: ['/lancamento'] },
                    { label: 'Categoria de Lançamento', icon: 'pi pi-fw pi-users', routerLink: ['/categoria-lancamento'] },
                    { label: 'Contas', icon: 'pi pi-fw pi-users', routerLink: ['/contas'] },
                ]
            },

        ];
    }
}
