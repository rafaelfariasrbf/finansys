import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService} from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ContasService } from '../../services/contas.service';
import { Conta } from 'src/app/models/conta.model';
import { ContasFormComponent } from '../../components/contas-form/contas-form.component';

@Component({
  selector: 'app-contas-consulta-container',
  templateUrl: './contas-consulta-container.component.html',
  styleUrls: ['./contas-consulta-container.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ContasConsultaContainerComponent implements OnInit {
    private subs$: Subscription[] = [];
    ref: DynamicDialogRef | undefined;
    contas: Conta[] = [];
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
        private service: ContasService,
        private route: ActivatedRoute,
        private router: Router,
        private confirmationService: ConfirmationService,
        public dialogService: DialogService,
        public messageService: MessageService
    ) { }

    ngOnInit() {
        this.contas = this.route.snapshot.data['data'].data;
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
                    this.contas = dados.data;
                    this.currentPage = dados.meta.currentPage;
                    this.itemsPerPage = {name: `${dados.meta.itemsPerPage}`};
                    this.totalItems = dados.meta.totalItems;
                    this.totalPages = dados.meta.totalPages;
                    this.sortBy = dados.meta.sortBy;
                })
            );
        }
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

    ngOnDestroy(): void {
        this.subs$.forEach((sub) => {
          sub.unsubscribe();
        });
    }

    show(conta?: any) {
        this.ref = this.dialogService.open(ContasFormComponent, {
            data: {
                conta: conta
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

}
