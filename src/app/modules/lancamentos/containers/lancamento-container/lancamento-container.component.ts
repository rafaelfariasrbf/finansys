import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';

import { MenuItem } from 'primeng/api';
import { TabMenu } from 'primeng/tabmenu';
import { MessagesService } from '../../../../shared/services/messages.service';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento-container.component.html',
  styleUrls: ['./lancamento-container.component.scss']
})
export class LancamentoContainerComponent {
    private subs$: Subscription[] = [];

    _breadcrumbItems: MenuItem[] = [];
    _tabMenuItems: MenuItem[] = [];
    _home!: MenuItem;
    _activatedRoute = false;
    _activeTabMenuItem!: MenuItem;

    _messageEventSubscription!: Subscription;
    count = 0;

    @ViewChild('tabMenuItem')
    private _tabMenu!: TabMenu;

    constructor(
        private router: Router,
        private msgServices: MessagesService
    ) {}

    ngOnInit(): void {

        this._messageEventSubscription = this.msgServices.getMessageEvent().subscribe((msg: any) => {
            ++this.count;
            this.msgServices.showMessageSuccess(msg.title, msg.success);
        });

        this._breadcrumbItems = [
          { label: 'Lançamentos' },
        ];

        this._tabMenuItems = [
          {
            label: 'ENTRADA',
            command: () => this.router.navigate(['lancamento'])
          },
          {
            label: 'SAÍDA',
            command: () => this.router.navigate(['lancamento/saida'])
          },
        ];

        this._home = {
          icon: 'pi pi-home',
          url: environment.HOME_URL,
        };

        this._tabMenuItems.filter((tabMenuItem) =>{
          tabMenuItem.routerLink?.includes(this.router.url)
        });

        if(this.router.url==='/lancamento/saida'){
            this._activeTabMenuItem = this._tabMenuItems[1];
        }else{
            this._activeTabMenuItem = this._tabMenuItems[0];
        }

    }

    ngOnDestroy(): void {
        this.subs$.forEach((sub) => {
          sub.unsubscribe();
        });
        this._messageEventSubscription.unsubscribe();
    }

    handleBreadcrumbClick(e: any) {
        if (!e.item.icon) {
            this._breadcrumbItems[
            this._breadcrumbItems.indexOf(e.item)
            ].disabled = true;
        }
    }

    handleMenuClick() {
        // if (this._activeTabMenuItem !== this._tabMenu.activeItem) {
        //     this._activeTabMenuItem = this._tabMenu.activeItem;

        //     for (const tabMenuItem of this._tabMenuItems) {
        //         tabMenuItem.disabled = true;
        //     }
        // }
    }
}
