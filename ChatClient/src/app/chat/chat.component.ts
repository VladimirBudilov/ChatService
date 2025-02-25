import { Component, OnInit, signal, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgForOf, AsyncPipe } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatList, MatListItem } from '@angular/material/list';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { UsersService } from '../services/users.service';
import { MessagesService } from '../services/messages.service';
import { Router } from '@angular/router';
import { Message } from '../models/Message';
import { User } from '../models/User';

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
    MatInput,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  standalone: true
})
export class ChatComponent implements OnInit {
  private usersService = inject(UsersService);
  private messagesService = inject(MessagesService);
  private router = inject(Router);

  currentUser = signal<User | null>(null);
  users = signal<User[]>([]);
  messages = signal<Message[]>([]);
  messageControl = new FormControl('');

  skip = 0;
  pageSize = 20;
  loading = false;

  ngOnInit() {
    this.usersService.getCurrentUser().subscribe(user => this.currentUser.set(user));
    this.usersService.getUsers().subscribe(users => this.users.set(users!));
    this.loadMoreMessages();
  }

  loadMoreMessages() {
    if (this.loading) return;
    this.loading = true;

    this.messagesService.getMessages(this.skip, this.pageSize).subscribe({
      next: (newMessages) => {
        this.messages.set([...newMessages.reverse(), ...this.messages()]);
        this.skip += this.pageSize;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  sendMessage() {
    const text = this.messageControl.value?.trim();
    const user = this.currentUser();
    if (!text || !user) return;

    this.messagesService.sendMessage({ text, userId: user.id }).subscribe(sentMessage => {
      this.messages.set([...this.messages(), sentMessage]);
      this.messageControl.reset();
    });
  }

  logout() {
    this.usersService.logout();
    this.router.navigate(['/home']);
  }
}
