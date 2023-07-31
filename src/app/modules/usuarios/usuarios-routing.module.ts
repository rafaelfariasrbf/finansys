import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosContainerComponent } from './containers/usuarios-container/usuarios-container.component';
import { UsuariosConsultaContainerComponent } from './containers/usuarios-consulta-container/usuarios-consulta-container.component';
import { UsuariosConsultaResolver } from './resolvers/usuarios-consulta.resolver';
import { UsuariosCadastroComponent } from './containers/usuarios-cadastro/usuarios-cadastro.component';
import { UsuariosCadastroResolver } from './resolvers/usuarios-cadastro.resolver';

const routes: Routes = [
    {
        path: '',
        component: UsuariosContainerComponent,
        children: [
            {
                path: '',
                component: UsuariosConsultaContainerComponent,
                resolve: { data: UsuariosConsultaResolver }
            },
            {
                path: 'novo',
                component: UsuariosCadastroComponent,
                resolve: { data: UsuariosCadastroResolver }
            },
            {
                path: 'editar/:id',
                component: UsuariosCadastroComponent,
                resolve: { data: UsuariosCadastroResolver }
            }
        ]
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
