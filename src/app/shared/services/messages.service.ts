import { Injectable } from '@angular/core';
import { MessageService, Message } from 'primeng/api';
import { Subject } from 'rxjs';

export enum AlertTypes {
    DANGER = 'error',
    SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private messageService: MessageService,
  ) { }

  messageEvent = new Subject();

  getMessageEvent(){
    return this.messageEvent.asObservable();
  }

  showMessageDanger(title: string, message: string){
    this.messageService.add({ severity: AlertTypes.DANGER, summary: title, detail: message });
  }

  showMessageSuccess(title: string, message: string){
    this.messageService.add({ severity: AlertTypes.SUCCESS, summary: title, detail: message });
  }

}
