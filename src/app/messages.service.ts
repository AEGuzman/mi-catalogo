import { Injectable } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  
  messages: string[] = [];
  constructor() { }

  add(message: string){
    var today = new Date();
    var time  = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  this.messages.push(`${time} - ${message}` );
}
clear(){
  this.messages=[];
}
}
