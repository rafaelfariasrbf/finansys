import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { CategoriaLancamentoModule } from './modules/categoria-lancamento/categoria-lancamento.module';
import { LancamentosModule } from './modules/lancamentos/lancamentos.module';
//PrimeNg
import { ConfirmationService, MessageService } from 'primeng/api';
import { ContasModule } from './modules/contas/contas.module';
import { AuthModule } from './demo/components/auth/auth.module';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        UsuariosModule,
        CategoriaLancamentoModule,
        LancamentosModule,
        ContasModule,
        AuthModule
    ],
    providers: [
        MessageService,
        ConfirmationService,
        { provide: LocationStrategy, useClass: HashLocationStrategy},
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

