import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private messageService: MessageService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  clear(): void {
    this.messageService.clear();
  }

  length(): number {
    return this.messageService.messages.length;
  }

  messages(): string[] {
    return this.messageService.messages;
  }

  logout(): void {
    this.authService.logout();
  }

}