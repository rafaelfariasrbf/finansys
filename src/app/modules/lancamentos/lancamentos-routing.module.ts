import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LancamentoContainerComponent } from './containers/lancamento-container/lancamento-container.component';
import { LancamentoConsultaContainerComponent } from './containers/lancamento-consulta-container/lancamento-consulta-container.component';
import { LancamentoCadastroContainerComponent } from './containers/lancamento-cadastro-container/lancamento-cadastro-container.component';
import { LancamentoConsultaResolver } from './resolvers/lancamento-consulta.resolver';
import { LancamentoCadastroResolver } from './resolvers/lancamento-cadastro.resolver';

const routes: Routes = [
    {
        path: '',
        component: LancamentoContainerComponent,
        children: [
            {
                path: '',
                component: LancamentoConsultaContainerComponent,
                resolve: { data: LancamentoConsultaResolver }
            },
            {
                path: 'saida',
                component: LancamentoConsultaContainerComponent,
                resolve: { data: LancamentoConsultaResolver }
            },
            {
                path: 'novo',
                component: LancamentoCadastroContainerComponent,
                resolve: { data: LancamentoCadastroResolver }
            },
            {
                path: 'editar/:id',
                component: LancamentoCadastroContainerComponent,
                resolve: { data: LancamentoCadastroResolver }
            }
        ],
        resolve: { data: LancamentoConsultaResolver }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
