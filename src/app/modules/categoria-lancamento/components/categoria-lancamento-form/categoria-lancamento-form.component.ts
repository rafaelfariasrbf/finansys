import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormUtilsService } from '../../../../shared/form/form-utils.service';
import { CategoriaLancamentoService } from '../../services/categoria-lancamento.service';
import { MessagesService } from '../../../../shared/services/messages.service';
import { CategoriaLancamento } from '../../../../models/categoria-lancamento.model';
import { DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-categoria-lancamento-form',
  templateUrl: './categoria-lancamento-form.component.html',
  styleUrls: ['./categoria-lancamento-form.component.scss']
})
export class CategoriaLancamentoFormComponent implements OnInit {

    categoria!: any;
    form!: FormGroup;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        public formUtils: FormUtilsService,
        private service: CategoriaLancamentoService,
        private msgService: MessagesService,
        public config: DynamicDialogConfig,
        private dialogService: DialogService
    ) {    }

    ngOnInit() {
        this.loadData();


        this.form = this.fb.group({
            id: [this.categoria.id],
            nome: [this.categoria.nome, [Validators.required, Validators.maxLength(100)]],
        });
    }

    loadData(){
        if(this.config.data.categoria){
            this.categoria = this.config.data.categoria;
        }else{
            this.categoria = {
                'id': null,
                'descricao': null
            }
        }
    }

    onSubmit(){
        if(this.form.valid){
            this.loading = true;
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
                    this.onHideDialog();
                },
                error => {
                    this.msgService.messageEvent.next(msg);
                }
            )
        }else{
            this.formUtils.validateAllFormFields(this.form);
        }
    }

    onHideDialog(){
        this.dialogService.dialogComponentRefMap.forEach(dialog => {
            dialog.destroy();
        });
    }

}
