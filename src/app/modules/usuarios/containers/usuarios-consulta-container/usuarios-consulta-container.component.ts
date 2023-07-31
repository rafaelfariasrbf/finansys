import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService} from 'primeng/api';
import { UsuariosCadastroComponent } from '../usuarios-cadastro/usuarios-cadastro.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-usuarios-consulta-container',
  templateUrl: './usuarios-consulta-container.component.html',
  styleUrls: ['./usuarios-consulta-container.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class UsuariosConsultaContainerComponent implements OnInit {
    private subs$: Subscription[] = [];
    ref: DynamicDialogRef | undefined;
    usuarios: Usuario[] = [];
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
        private usuariosService: UsuariosService,
        private route: ActivatedRoute,
        private router: Router,
        private confirmationService: ConfirmationService,
        public dialogService: DialogService,
        public messageService: MessageService
    ) { }

    ngOnInit() {
        this.usuarios = this.route.snapshot.data['data'].data;
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
                this.usuariosService.getAllPaginated(params).subscribe((dados) => {
                    this.usuarios = dados.data;
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
        this.router.navigate(["/usuarios/novo"]);
    }

    onEdit(id: string){
        this.router.navigate([`/usuarios/editar/${id}`]);
    }

    onDelete(id: string, event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Você realmente deseja excluir este registro?',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.usuariosService.delete(id).subscribe((dados) => {
                    this.messageService.add({ severity: 'info', summary: 'Confirmação', detail: 'O registro foi deletado.' });
                });
            }
        });
    }

    show(usuario?: any) {
        this.ref = this.dialogService.open(UsuariosCadastroComponent, {
            data: {
                usuario: usuario
            },
            header: 'Usuário',
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
