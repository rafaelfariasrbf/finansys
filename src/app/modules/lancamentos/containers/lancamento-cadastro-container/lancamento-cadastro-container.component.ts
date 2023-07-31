import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { LancamentoService } from '../../services/lancamento.service';
import { Lancamento } from 'src/app/models/lancamento.model';
import { Transacao } from 'src/app/enums/transacao.enum';

@Component({
  selector: 'app-lancamento-cadastro-container',
  templateUrl: './lancamento-cadastro-container.component.html',
  styleUrls: ['./lancamento-cadastro-container.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class LancamentoCadastroContainerComponent implements OnInit {

    lancamento!: Lancamento;
    form!: FormGroup;
    transacoes = Transacao;
    mensagem = new EventEmitter();


    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        public formUtils: FormUtilsService,
        private service: LancamentoService,
        private msgService: MessagesService
    ) {    }

    ngOnInit() {
        const data = this.route.snapshot.data['data'];
        this.form = this.fb.group({
            id: [data.id],
            descricao: [data.descricao, [Validators.required, Validators.maxLength(100)]],
            valor: [data.valor, [Validators.required]],
            transacao: [data.transacao, [Validators.required]],
            categoriaLancamento: [data.CategoriaLancamento, [Validators.required]],
            usuario: [data.usuario, [Validators.required]],
            data: [data.data, [Validators.required]],
        });
    }

    onSubmit(){
        if(this.form.valid){
            let msg = {
                "title": "Criação",
                "success": 'Lançamento criado com sucesso!',
                "error": 'Erro ao criar lançamento, tente novamente!',
                "status": "CREATE"

            }
            if (this.form.value.id) {
                msg = {
                    "title": "Atualização",
                    "success": 'Lancamento atualizado com sucesso!',
                    "error": 'Erro ao atualizar lançamento, tente novamente!',
                    "status": "UPDATE"
                }
            }
            this.service.save(this.form.value).subscribe(
                success => {
                    this.msgService.messageEvent.next(msg);
                    this.router.navigate(['/lancamento']);
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
        this.router.navigate(['/lancamento']);
    }

}
