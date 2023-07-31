import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';

import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { LancamentoContainerComponent } from './containers/lancamento-container/lancamento-container.component';
import { LancamentoConsultaContainerComponent } from './containers/lancamento-consulta-container/lancamento-consulta-container.component';
import { LancamentoCadastroContainerComponent } from './containers/lancamento-cadastro-container/lancamento-cadastro-container.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { LancamentoFormComponent } from './components/lancamento-form/lancamento-form.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [
    LancamentoContainerComponent,
    LancamentoConsultaContainerComponent,
    LancamentoCadastroContainerComponent,
    LancamentoFormComponent
  ],
  imports: [
    CommonModule,
    LancamentosRoutingModule,
    //PRIMENG
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
    TabMenuModule,
    DynamicDialogModule,
    CalendarModule,
    InputMaskModule
  ],
  exports: [
    LancamentoContainerComponent,
    LancamentoConsultaContainerComponent,
    LancamentoCadastroContainerComponent
  ],
  providers: [
    DialogService
  ]
})
export class LancamentosModule { }
