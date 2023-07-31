import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriaLancamento } from 'src/app/models/categoria-lancamento.model';
import { CategoriaLancamentoService } from '../../services/categoria-lancamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CategoriaLancamentoFormComponent } from '../../components/categoria-lancamento-form/categoria-lancamento-form.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-categoria-lancamento-consulta-container',
  templateUrl: './categoria-lancamento-consulta-container.component.html',
  styleUrls: ['./categoria-lancamento-consulta-container.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class CategoriaLancamentoConsultaContainerComponent  implements OnInit, OnDestroy{
    private subs$: Subscription[] = [];
    ref: DynamicDialogRef | undefined;
    categorias: CategoriaLancamento[] = [];
    search!: string;
    currentPage!:number;
    itemsPerPage!:any;
    totalItems!: number;
    totalPages!: number;
    sortBy: any[] = [];
    itemsPerPageOption = [
        {name: '10'},
        {name: '20'},
        {name: '30'},
    ];

    constructor(
        private service: CategoriaLancamentoService,
        private route: ActivatedRoute,
        private router: Router,
        private confirmationService: ConfirmationService,
        public dialogService: DialogService,
        public messageService: MessageService
    ) { }

    ngOnInit() {
        this.categorias = this.route.snapshot.data['data'].data;
        this.search = '';
        this.currentPage = this.route.snapshot.data['data'].meta.currentPage;
        this.itemsPerPage = {name: `${this.route.snapshot.data['data'].meta.itemsPerPage}`};
        this.totalItems = this.route.snapshot.data['data'].meta.totalItems;
        this.totalPages = this.route.snapshot.data['data'].meta.totalPages;
        this.sortBy = this.route.snapshot.data['data'].meta.sortBy;
    }

    updateTable(page = 0, isAction = true, search = ''){
        this.search = search;
        const params = {
            search: search,
            page: (page+1).toString(),
            limit: this.itemsPerPage.name
        };
        if(this.currentPage !== (page+1) || isAction){
            this.subs$.push(
                this.service.getAllPaginated(params).subscribe((dados) => {
                    this.categorias = dados.data;
                    this.currentPage = dados.meta.currentPage;
                    this.itemsPerPage = {name: `${dados.meta.itemsPerPage}`};
                    this.totalItems = dados.meta.totalItems;
                    this.totalPages = dados.meta.totalPages;
                    this.sortBy = dados.meta.sortBy;
                })
            );
        }
    }

    handleNew(){
        this.router.navigate(["/categoria-lancamento/novo"]);
    }

    onEdit(id: string){
        this.router.navigate([`/categoria-lancamento/editar/${id}`]);
    }

    onDelete(id: string, event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Você realmente deseja excluir este registro?',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.delete(id).subscribe((dados) => {
                    this.messageService.add({ severity: 'info', summary: 'Confirmação', detail: 'O registro foi deletado.' });
                    this.updateTable();
                });
            }
        });
    }

    show(categoria?: any) {
        this.ref = this.dialogService.open(CategoriaLancamentoFormComponent, {
            data: {
                categoria: categoria
            },
            header: 'Categoria de Lançamento',
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
        this.subs$.forEach((sub) => {
          sub.unsubscribe();
        });
    }
}
