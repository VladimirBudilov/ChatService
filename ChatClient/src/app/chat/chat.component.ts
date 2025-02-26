import {Component, OnInit, signal, inject, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, DatePipe, NgIf} from '@angular/common';
import {MatFormField} from '@angular/material/form-field';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatList, MatListItem} from '@angular/material/list';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {UsersService} from '../services/users.service';
import {MessagesService} from '../services/messages.service';
import {Router} from '@angular/router';
import {Message} from '../models/Message';
import {User} from '../models/User';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';
import {CreateMessageRequest} from '../models/CreateMessageRequest';

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
    DatePipe,
    InfiniteScrollDirective,
    NgIf,
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
  hasMoreMessages = true;

  ngOnInit() {
    this.usersService.getCurrentUser().subscribe(user => this.currentUser.set(user));
    this.usersService.getUsers().subscribe(users => this.users.set(users!));
    this.loadMessages();
  }

  sendMessage() {
    const text = this.messageControl.value?.trim();
    const user = this.currentUser();
    if (!text || !user) return;
    const message: CreateMessageRequest = new CreateMessageRequest(text, user.id);
    this.messagesService.sendMessage(message).subscribe(() => {
      this.messageControl.reset();
    });
  }

  logout() {
    this.usersService.logout();
    this.router.navigate(['/home']);
  }

  loadMessages() {
    console.log('Loading messages...will be soon');
    if (!this.hasMoreMessages || this.loading) return;

    console.log('Loading messages...');
    this.loading = true;
    return this.messagesService.getMessages(this.skip, this.pageSize).subscribe(messages => {
      this.loading = false;
      this.skip += messages.length;
      this.hasMoreMessages = messages.length === this.pageSize;
      this.messages.set([...messages, ...this.messages()]);
    });
  }
}
