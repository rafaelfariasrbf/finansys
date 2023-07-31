import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../modules/auth/services/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    items!: MenuItem[];

    ProfileItems = [
        {
            label: '',
            icon: 'pi pi-user',
            items: [
                { label: 'Meu perfil', icon: 'pi pi-user-edit' },
                { label: 'Alterar senha', icon: 'pi pi-lock' },
                {
                    separator: true
                },
                { label: 'Sair', icon: 'pi pi-sign-out', command: () => {
                    this.authService.logout();
                } }
            ]
        }
    ];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private authService: AuthService) {}
}
