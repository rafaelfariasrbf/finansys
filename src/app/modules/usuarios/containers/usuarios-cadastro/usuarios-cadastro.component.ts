import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';
import { Usuario } from 'src/app/models/usuario.model';
import { catchError, throwError } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-usuarios-cadastro',
  templateUrl: './usuarios-cadastro.component.html',
  styleUrls: ['./usuarios-cadastro.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class UsuariosCadastroComponent implements OnInit {

    usuario!: any;
    form!: FormGroup;
    mensagem = new EventEmitter();
    loading = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        public formUtils: FormUtilsService,
        private usuariosService: UsuariosService,
        private msgService: MessagesService,
        public config: DynamicDialogConfig,
        private dialogService: DialogService
    ) {    }

    ngOnInit() {
        this.loadData();
        this.form = this.fb.group({
            id: [this.usuario.id],
            nome: [this.usuario.nome, [Validators.required, Validators.maxLength(100)]],
            idade: [this.usuario.idade, [Validators.required, Validators.min(0), Validators.max(100)]],
            email: [this.usuario.email, [Validators.required, Validators.email]]
        });
    }

    loadData(){
        if(this.config.data.usuario){
            this.usuario = this.config.data.usuario;
        }else{
            this.usuario = {
                'id': null,
                'descricao': null
            }
        }
    }

    onSubmit(){
        this.loading = true;
        if(this.form.valid){
            let msg = {
                "title": "Criação",
                "success": 'Usuário criado com sucesso!',
                "error": 'Erro ao criar usuário, tente novamente!',
                "status": "CREATE"

            }
            if (this.form.value.id) {
                msg = {
                    "title": "Atualização",
                    "success": 'Usuário atualizado com sucesso!',
                    "error": 'Erro ao atualizar usuário, tente novamente!',
                    "status": "UPDATE"
                }
            }
            this.usuariosService.save(this.form.value).subscribe(
                success => {
                    this.msgService.messageEvent.next(msg);
                    this.router.navigate(['/usuarios']);
                    this.onHideDialog();
                    this.loading = false;
                },
                error => {
                    this.msgService.messageEvent.next(msg);
                    this.loading = false;
                }
            )
        }else{
            this.formUtils.validateAllFormFields(this.form);
            this.loading = false;
        }
    }

    onCancel(){
        this.router.navigate(['/usuarios']);
    }
    onHideDialog(){
        this.dialogService.dialogComponentRefMap.forEach(dialog => {
            dialog.destroy();
        });
    }
}
