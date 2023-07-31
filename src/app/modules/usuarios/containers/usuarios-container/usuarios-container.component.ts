import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';

import { MenuItem, MessageService } from 'primeng/api';
import { TabMenu } from 'primeng/tabmenu';
import { MessagesService } from '../../../../shared/services/messages.service';


@Component({
  selector: 'app-usuarios-container',
  templateUrl: './usuarios-container.component.html',
  styleUrls: ['./usuarios-container.component.scss']
})
export class UsuariosContainerComponent implements OnInit {
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
        private messageService: MessageService,
        private msgServices: MessagesService
    ) {}

    ngOnInit(): void {

        this._messageEventSubscription = this.msgServices.getMessageEvent().subscribe((msg: any) => {
            ++this.count;
            this.msgServices.showMessageSuccess(msg.title, msg.success);
        });

        this._breadcrumbItems = [
          { label: 'Usuários' },
        ];

        // this._tabMenuItems = [
        //   {
        //     label: 'ATIVOS',
        //     routerLink: [`/facilitadores/diretriz`],
        //   },
        //   {
        //     label: 'INATIVOS',
        //     routerLink: [`/facilitadores/diretriz/inativos`],
        //   },
        // ];

        this._home = {
          icon: 'pi pi-home',
          url: environment.HOME_URL,
        };

        this._activeTabMenuItem = this._tabMenuItems.filter((tabMenuItem) =>
          tabMenuItem.routerLink?.includes(this.router.url)
        )[0];

        this.subs$.push(
          this.router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
              for (const tabMenuItem of this._tabMenuItems) {
                tabMenuItem.disabled = false;
              }
            }
          })
        );
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
        if (this._activeTabMenuItem !== this._tabMenu.activeItem) {
            this._activeTabMenuItem = this._tabMenu.activeItem;

            for (const tabMenuItem of this._tabMenuItems) {
            tabMenuItem.disabled = true;
            }
        }
    }
}
