import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { CategoriaLancamentoService } from '../../services/categoria-lancamento.service';
import { CategoriaLancamento } from 'src/app/models/categoria-lancamento.model';

@Component({
  selector: 'app-categoria-lancamento-cadastro-container',
  templateUrl: './categoria-lancamento-cadastro-container.component.html',
  styleUrls: ['./categoria-lancamento-cadastro-container.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class CategoriaLancamentoCadastroContainerComponent implements OnInit {

    categoria!: CategoriaLancamento;
    form!: FormGroup;
    mensagem = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        public formUtils: FormUtilsService,
        private service: CategoriaLancamentoService,
        private msgService: MessagesService
    ) {    }

    ngOnInit() {
        const categoria = this.route.snapshot.data['data'];
        this.form = this.fb.group({
            id: [categoria.id],
            nome: [categoria.nome, [Validators.required, Validators.maxLength(100)]],
        });
    }

    onSubmit(){
        if(this.form.valid){
            let msg = {
                "title": "Criação",
                "success": 'Categoria criada com sucesso!',
                "error": 'Erro ao criar categoria, tente novamente!',
                "status": "CREATE"

            }
            if (this.form.value.id) {
                msg = {
                    "title": "Atualização",
                    "success": 'Categoria atualizado com sucesso!',
                    "error": 'Erro ao atualizar categoria, tente novamente!',
                    "status": "UPDATE"
                }
            }
            this.service.save(this.form.value).subscribe(
                success => {
                    this.msgService.messageEvent.next(msg);
                    this.router.navigate(['/categoria-lancamento']);
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
        this.router.navigate(['/categoria-lancamento']);
    }

}
