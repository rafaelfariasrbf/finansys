import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { ContasContainerComponent } from './containers/contas-container/contas-container.component';
import { ContasCadastroComponent } from './containers/contas-cadastro/contas-cadastro.component';
import { ContasRoutingModule } from './contas-routing.module';
import { ContasConsultaContainerComponent } from './containers/contas-consulta-container/contas-consulta-container.component';
import { ContasFormComponent } from './components/contas-form/contas-form.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';


@NgModule({
    declarations: [
        ContasContainerComponent,
        ContasCadastroComponent,
        ContasConsultaContainerComponent,
        ContasFormComponent
    ],
    imports: [
        CommonModule,
        ContasRoutingModule,
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
        DynamicDialogModule
    ],
    exports: [
        ContasContainerComponent,
        ContasCadastroComponent,
        ContasConsultaContainerComponent
    ],
    providers: [
        DialogService
    ]
})
export class ContasModule { }
