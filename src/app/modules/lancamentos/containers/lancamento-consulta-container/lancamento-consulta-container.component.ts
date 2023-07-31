import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriaLancamento } from 'src/app/models/categoria-lancamento.model';
import { LancamentoService } from '../../services/lancamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Lancamento } from 'src/app/models/lancamento.model';
import { Transacao } from 'src/app/enums/transacao.enum';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LancamentoFormComponent } from '../../components/lancamento-form/lancamento-form.component';

@Component({
    selector: 'app-lancamento-consulta-container',
    templateUrl: './lancamento-consulta-container.component.html',
    styleUrls: ['./lancamento-consulta-container.component.scss']
})
export class LancamentoConsultaContainerComponent implements OnInit, OnDestroy {
    private subs$: Subscription[] = [];
    ref: DynamicDialogRef | undefined;
    lancamentos: Lancamento[] = [];
    search!: string;
    currentPage!: number;
    itemsPerPage!: any;
    totalItems!: number;
    totalPages!: number;
    sortBy: any[] = [];
    transacao: string = "";
    itemsPerPageOption = [{ name: '10' }, { name: '20' }, { name: '30' }];

    _isSaida = true;

    constructor(
        private service: LancamentoService,
        private route: ActivatedRoute,
        private router: Router,
        private confirmationService: ConfirmationService,
        public dialogService: DialogService,
        public messageService: MessageService
    ) {}

    ngOnInit() {
        console.log(this.route.snapshot.data['data']);

        this.transacao = this.route.snapshot.routeConfig?.path === 'saida' ? Transacao.SAIDA : Transacao.ENTRADA;
        this._isSaida =
            this.route.snapshot.routeConfig?.path === 'saida' ? true : false;
        this.lancamentos = !this._isSaida
            ? this.route.snapshot.data['data'].Lancamentos.data
            : this.route.snapshot.data['data'].LancamentosSaida.data;
        this.search = '';
        this.currentPage = !this._isSaida
            ? this.route.snapshot.data['data'].Lancamentos.meta.currentPage
            : this.route.snapshot.data['data'].LancamentosSaida.meta
                  .currentPage;
        this.itemsPerPage = !this._isSaida
            ? {
                  name: `${this.route.snapshot.data['data'].Lancamentos.meta.itemsPerPage}`
              }
            : {
                  name: `${this.route.snapshot.data['data'].LancamentosSaida.meta.itemsPerPage}`
              };
        this.totalItems = !this._isSaida
            ? this.route.snapshot.data['data'].Lancamentos.meta.totalItems
            : this.route.snapshot.data['data'].LancamentosSaida.meta.totalItems;
        this.totalPages = !this._isSaida
            ? this.route.snapshot.data['data'].Lancamentos.meta.totalPages
            : this.route.snapshot.data['data'].LancamentosSaida.meta.totalPages;
        this.sortBy = !this._isSaida
            ? this.route.snapshot.data['data'].Lancamentos.meta.sortBy
            : this.route.snapshot.data['data'].LancamentosSaida.meta.sortBy;
    }

    updateTable(page = 0, isAction = true, search = '') {
        this.search = search;
        const params = {
            'search': search,
            'page': (page + 1).toString(),
            'limit': this.itemsPerPage.name,
            'filter.transacao': this.transacao
        };
        if (this.currentPage !== page + 1 || isAction) {
            this.subs$.push(
                this.service.getAll(this.transacao, params).subscribe(dados => {
                    this.lancamentos = dados.data;
                    this.currentPage = dados.meta.currentPage;
                    this.itemsPerPage = { name: `${dados.meta.itemsPerPage}` };
                    this.totalItems = dados.meta.totalItems;
                    this.totalPages = dados.meta.totalPages;
                    this.sortBy = dados.meta.sortBy;
                })
            );
        }
    }

    handleNew() {
        this.router.navigate(['/lancamento/novo']);
    }

    onEdit(id: string) {
        this.router.navigate([`/lancamento/editar/${id}`]);
    }

    onDelete(id: string, event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Você realmente deseja excluir este registro?',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.delete(id).subscribe(dados => {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Confirmação',
                        detail: 'O registro foi deletado.'
                    });
                });
            }
        });
    }
    showFormModal(conta?: any) {
        this.ref = this.dialogService.open(LancamentoFormComponent, {
            data: {
                conta: conta,
                transacao: this.transacao
            },
            header: 'Conta',
            width: '50%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true
        });

        this.ref.onDestroy.subscribe((data)=>{
            this.updateTable();
        })

        this.ref.onMaximize.subscribe((value) => {
            this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
        });
    }

    ngOnDestroy(): void {
        this.subs$.forEach(sub => {
            sub.unsubscribe();
        });
    }
}
