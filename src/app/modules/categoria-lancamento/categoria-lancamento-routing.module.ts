import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaLancamentoContainerComponent } from './containers/categoria-lancamento-container/categoria-lancamento-container.component';
import { CategoriaLancamentoConsultaContainerComponent } from './containers/categoria-lancamento-consulta-container/categoria-lancamento-consulta-container.component';
import { CategoriaLancamentoConsultaResolver } from './resolvers/categoria-lancamento-consulta.resolver';
import { CategoriaLancamentoCadastroContainerComponent } from './containers/categoria-lancamento-cadastro-container/categoria-lancamento-cadastro-container.component';
import { CategoriaLancamentoCadastroResolver } from './resolvers/categoria-lancamento-cadastro.resolver';

const routes: Routes = [
    {
        path: '',
        component: CategoriaLancamentoContainerComponent,
        children: [
            {
                path: '',
                component: CategoriaLancamentoConsultaContainerComponent,
                resolve: { data: CategoriaLancamentoConsultaResolver }
            },
            {
                path: 'novo',
                component: CategoriaLancamentoCadastroContainerComponent,
                resolve: { data: CategoriaLancamentoCadastroResolver }
            },
            {
                path: 'editar/:id',
                component: CategoriaLancamentoCadastroContainerComponent,
                resolve: { data: CategoriaLancamentoCadastroResolver }
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaLancamentoRoutingModule { }
