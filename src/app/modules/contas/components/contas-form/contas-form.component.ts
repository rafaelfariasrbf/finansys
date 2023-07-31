import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContasService } from '../../services/contas.service';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-contas-form',
  templateUrl: './contas-form.component.html',
  styleUrls: ['./contas-form.component.scss']
})
export class ContasFormComponent {

    conta!: any;
    form!: FormGroup;


    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        public formUtils: FormUtilsService,
        private service: ContasService,
        private msgService: MessagesService,
        public config: DynamicDialogConfig,
        private dialogService: DialogService
    ) {    }

    ngOnInit() {
        this.loadData();
        this.form = this.fb.group({
            id: [this.conta.id],
            descricao: [this.conta.descricao, [Validators.required, Validators.maxLength(100)]],
        });
    }

    loadData(){
        if(this.config.data.conta){
            this.conta = this.config.data.conta;
        }else{
            this.conta = {
                'id': null,
                'descricao': null
            }
        }
    }

    onSubmit(){
        if(this.form.valid){
            let msg = {
                "title": "Criação",
                "success": 'Conta criada com sucesso!',
                "error": 'Erro ao criar conta, tente novamente!',
                "status": "CREATE"
            }
            if (this.form.value.id) {
                msg = {
                    "title": "Atualização",
                    "success": 'Conta atualizada com sucesso!',
                    "error": 'Erro ao atualizar conta, tente novamente!',
                    "status": "UPDATE"
                }
            }
            this.service.save(this.form.value).subscribe(
                success => {
                    this.msgService.messageEvent.next(msg);
                    this.router.navigate(['/contas']);
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
