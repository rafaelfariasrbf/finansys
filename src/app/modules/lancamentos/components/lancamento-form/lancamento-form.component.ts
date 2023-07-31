import { UsuariosService } from './../../../usuarios/services/usuarios.service';
import { Component, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { ContasService } from 'src/app/modules/contas/services/contas.service';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Transacao } from 'src/app/enums/transacao.enum';
import { CategoriaLancamentoService } from 'src/app/modules/categoria-lancamento/services/categoria-lancamento.service';
import { LancamentoService } from '../../services/lancamento.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lancamento-form',
  templateUrl: './lancamento-form.component.html',
  styleUrls: ['./lancamento-form.component.scss']
})
export class LancamentoFormComponent implements OnInit, OnDestroy{
    private subs$: Subscription[] = [];
    lancamento!: any;
    form!: FormGroup;
    mensagem = new EventEmitter();
    transacoes: any = [];
    transacao: string = "";
    categorias: any = [];
    usuarios: any = [];
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        public formUtils: FormUtilsService,
        private service: LancamentoService,
        private msgService: MessagesService,
        public config: DynamicDialogConfig,
        private dialogService: DialogService,
        private categoriaService: CategoriaLancamentoService,
        private usuarioService: UsuariosService
    ) {    }

    ngOnInit() {
        this.loadTransacao();
        this.loadCategoria();
        this.loadUsuario();
        this.loadDados();
        this.form = this.fb.group({
            id: [this.lancamento.id],
            descricao: [this.lancamento.descricao, [Validators.required, Validators.maxLength(100)]],
            valor: [this.lancamento.valor],
            transacao: [this.lancamento.transacao],
            categoriaLancamento: [this.lancamento.categoriaLancamento],
            usuario: [this.lancamento.usuario],
            data: [this.lancamento.data]
        });
    }

    loadCategoria(){
        this.categoriaService.getAll().subscribe(dados => {
            this.categorias = dados;
        });
    }
    loadUsuario(){
        this.usuarioService.getAll().subscribe(dados => {
            this.usuarios = dados;
        });
    }
    loadTransacao(){
        var typeArray = Object.keys(Transacao).map(type => {
            this.transacoes.push(type);
        });
        console.log(this.transacoes);

    }

    loadDados(){
        this.lancamento = {
            id: null,
            descricao: null,
            valor: null,
            transacao: null,
            categoriaLancamento: null,
            usuario: null,
            data: null
        }
        if(this.config.data.conta){
            this.lancamento = this.config.data.conta;
            this.lancamento.data = new Date(this.lancamento.data);
        }
        if(this.config.data.transacao){
            console.log(this.config.data.transacao);
            this.lancamento.transacao = this.config.data.transacao;
        }
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
                    "success": 'Lançamento atualizado com sucesso!',
                    "error": 'Erro ao atualizar, tente novamente!',
                    "status": "UPDATE"
                }
            }
            console.log(this.form.value);

            this.service.save(this.form.value).subscribe(
                success => {
                    console.log(success);

                    this.msgService.messageEvent.next(msg);
                    // if(this.transacao === Transacao.SAIDA){
                    //     this.router.navigate(['/lancamento/saida']);
                    // }else{
                    //     this.router.navigate(['/lancamento']);
                    // }
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

    onCancel(){
        //this.router.navigate(['/contas']);
    }

    ngOnDestroy(): void {
        this.subs$.forEach(sub => {
            sub.unsubscribe();
        });
    }
}
