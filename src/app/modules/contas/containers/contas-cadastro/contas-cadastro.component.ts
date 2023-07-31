import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContasService } from '../../services/contas.service';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';
import { Usuario } from 'src/app/models/usuario.model';
import { catchError, throwError } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { Conta } from 'src/app/models/conta.model';

@Component({
  selector: 'app-usuarios-cadastro',
  templateUrl: './contas-cadastro.component.html',
  styleUrls: ['./contas-cadastro.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ContasCadastroComponent implements OnInit {

    conta!: Conta;
    form!: FormGroup;
    mensagem = new EventEmitter();


    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        public formUtils: FormUtilsService,
        private service: ContasService,
        private msgService: MessagesService
    ) {    }

    ngOnInit() {
        const conta = this.route.snapshot.data['data'];
        this.form = this.fb.group({
            id: [conta.id],
            descricao: [conta.descricao, [Validators.required, Validators.maxLength(100)]],
        });
    }

    onSubmit(){
        if(this.form.valid){
            let msg = {
                "title": "Criação",
                "success": 'Conta criado com sucesso!',
                "error": 'Erro ao criar conta, tente novamente!',
                "status": "CREATE"

            }
            if (this.form.value.id) {
                msg = {
                    "title": "Atualização",
                    "success": 'Conta atualizado com sucesso!',
                    "error": 'Erro ao atualizar conta, tente novamente!',
                    "status": "UPDATE"
                }
            }
            this.service.save(this.form.value).subscribe(
                success => {
                    this.msgService.messageEvent.next(msg);
                    this.router.navigate(['/contas']);
                },
                error => {
                    this.msgService.messageEvent.next(msg);
                }
            )
        }else{
            this.formUtils.validateAllFormFields(this.form);
        }
    }

    onCancel(){
        this.router.navigate(['/contas']);
    }

}
