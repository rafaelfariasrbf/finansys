import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContasContainerComponent } from './containers/contas-container/contas-container.component';
import { ContasConsultaContainerComponent } from './containers/contas-consulta-container/contas-consulta-container.component';
import { ContasCadastroComponent } from './containers/contas-cadastro/contas-cadastro.component';
import { ContasConsultaResolver } from './resolvers/contas-consulta.resolver';
import { ContasCadastroResolver } from './resolvers/contas-cadastro.resolver';

const routes: Routes = [
    {
        path: '',
        component: ContasContainerComponent,
        children: [
            {
                path: '',
                component: ContasConsultaContainerComponent,
                resolve: { data: ContasConsultaResolver }
            },
            {
                path: 'novo',
                component: ContasCadastroComponent,
                resolve: { data: ContasCadastroResolver }
            },
            {
                path: 'editar/:id',
                component: ContasCadastroComponent,
                resolve: { data: ContasCadastroResolver }
            }
        ]
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContasRoutingModule { }
