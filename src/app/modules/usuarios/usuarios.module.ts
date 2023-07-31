import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosContainerComponent } from './containers/usuarios-container/usuarios-container.component';
import { UsuariosConsultaContainerComponent } from './containers/usuarios-consulta-container/usuarios-consulta-container.component';
import { UsuariosCadastroComponent } from './containers/usuarios-cadastro/usuarios-cadastro.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
    declarations: [
        UsuariosContainerComponent,
        UsuariosConsultaContainerComponent,
        UsuariosCadastroComponent
    ],
    imports: [
        CommonModule,
        UsuariosRoutingModule,

        FormsModule,
        ReactiveFormsModule,
        BreadcrumbModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        ConfirmPopupModule,
        ToastModule,
        PaginatorModule,
        DropdownModule,
        ProgressSpinnerModule
    ],
    exports: [
        UsuariosContainerComponent,
        UsuariosConsultaContainerComponent,
        UsuariosCadastroComponent
    ]
})
export class UsuariosModule { }
