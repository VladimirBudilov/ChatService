import {Component, OnInit} from '@angular/core';
import { User } from '../models/User';
import { Message } from '../models/Message';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {MatFormField} from '@angular/material/form-field';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatList, MatListItem} from '@angular/material/list';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-chat',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    MatFormField,
    MatSidenavContent,
    MatListItem,
    MatList,
    MatSidenav,
    MatSidenavContainer,
    MatButton,
    MatInput
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  standalone: true,
})
export class ChatComponent implements OnInit {
  users: User[] = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' }
  ];

  messages: Message[] = [
    { userId: '1', text: 'Hello!' },
    { userId: '2', text: 'Hi there!' }
  ];

  messageControl = new FormControl('');
  currentUserId = localStorage.getItem('userId') || '1';

  ngOnInit() {
    if (!localStorage.getItem('userId')) {
      localStorage.setItem('userId', this.currentUserId);
    }
  }

  sendMessage() {
    if (this.messageControl.value) {
      this.messages.push({
        userId: this.currentUserId,
        text: this.messageControl.value
      });
      this.messageControl.setValue('');
    }
  }
}
