import { CategoriaLancamento } from 'src/app/models/categoria-lancamento.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Components
import { CategoriaLancamentoRoutingModule } from './categoria-lancamento-routing.module';
import { CategoriaLancamentoConsultaContainerComponent } from './containers/categoria-lancamento-consulta-container/categoria-lancamento-consulta-container.component';
import { CategoriaLancamentoCadastroContainerComponent } from './containers/categoria-lancamento-cadastro-container/categoria-lancamento-cadastro-container.component';
import { CategoriaLancamentoFormComponent } from './components/categoria-lancamento-form/categoria-lancamento-form.component';
// Prime-NG
import { ToastModule } from 'primeng/toast';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CategoriaLancamentoContainerComponent } from './containers/categoria-lancamento-container/categoria-lancamento-container.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListboxModule } from 'primeng/listbox';
import { ProgressSpinnerModule } from 'primeng/progressspinner';




@NgModule({
    declarations: [
        CategoriaLancamentoContainerComponent,
        CategoriaLancamentoConsultaContainerComponent,
        CategoriaLancamentoCadastroContainerComponent,
        CategoriaLancamentoFormComponent
    ],
    imports: [
        CommonModule,
        CategoriaLancamentoRoutingModule,
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
        ListboxModule,
        ProgressSpinnerModule
    ],
    exports: [
        CategoriaLancamentoContainerComponent,
        CategoriaLancamentoConsultaContainerComponent,
        CategoriaLancamentoCadastroContainerComponent,
        CategoriaLancamentoFormComponent
    ]
})
export class CategoriaLancamentoModule {}
