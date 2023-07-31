import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AuthGuard } from './helpers/auth.guards';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent, canActivate: [AuthGuard],
                children: [
                    { path: '', loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule) },
                    { path: 'usuarios', loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule) },
                    { path: 'lancamento', loadChildren: () => import('./modules/lancamentos/lancamentos.module').then(m => m.LancamentosModule) },
                    { path: 'categoria-lancamento', loadChildren: () => import('./modules/categoria-lancamento/categoria-lancamento.module').then(m => m.CategoriaLancamentoModule) },
                    { path: 'contas', loadChildren: () => import('./modules/contas/contas.module').then(m => m.ContasModule) },
                ]
            },
            { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
