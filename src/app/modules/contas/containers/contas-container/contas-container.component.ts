import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';

import { MenuItem, MessageService } from 'primeng/api';
import { TabMenu } from 'primeng/tabmenu';
import { MessagesService } from '../../../../shared/services/messages.service';


@Component({
  selector: 'app-contas-container',
  templateUrl: './contas-container.component.html',
  styleUrls: ['./contas-container.component.scss']
})
export class ContasContainerComponent implements OnInit {
    private subs$: Subscription[] = [];

    _breadcrumbItems: MenuItem[] = [];
    _home!: MenuItem;
    _activatedRoute = false;

    _messageEventSubscription!: Subscription;
    count = 0;

    @ViewChild('tabMenuItem')
    private _tabMenu!: TabMenu;

    constructor(
        private msgServices: MessagesService
    ) {}

    ngOnInit(): void {

        this._messageEventSubscription = this.msgServices.getMessageEvent().subscribe((msg: any) => {
            ++this.count;
            this.msgServices.showMessageSuccess(msg.title, msg.success);
        });

        this._breadcrumbItems = [
          { label: 'Contas' },
        ];

        this._home = {
          icon: 'pi pi-home',
          url: environment.HOME_URL,
        };
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
}
