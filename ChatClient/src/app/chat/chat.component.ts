import {Component, OnInit, signal, inject, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, AsyncPipe, DatePipe, NgIf} from '@angular/common';
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
import {filter} from 'rxjs';

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
    NgIf,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  standalone: true
})
export class ChatComponent implements OnInit, AfterViewInit {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

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
    this.loadMoreMessages();
  }

  ngAfterViewInit() {
    this.viewport.elementScrolled()
      .pipe(filter(() => this.viewport.measureScrollOffset('top') === 0 && !this.loading && this.hasMoreMessages))
      .subscribe(() => this.loadMoreMessages());
  }

  loadMoreMessages(): Promise<void> {
    if (this.loading || !this.hasMoreMessages) return Promise.resolve();
    this.loading = true;

    return new Promise<void>((resolve) => {
      this.messagesService.getMessages(this.skip, this.pageSize).subscribe({
        next: (newMessages) => {
          if (newMessages.length === 0) {
            this.hasMoreMessages = false;
          } else {
            this.messages.set([...newMessages, ...this.messages()]);
            this.skip += this.pageSize;
          }
          this.loading = false;
          resolve();
        },
        error: () => {
          this.loading = false;
          resolve();
        }
      });
    });
  }

  sendMessage() {
    const text = this.messageControl.value?.trim();
    const user = this.currentUser();
    if (!text || !user) return;

    this.messagesService.sendMessage({ text, userId: user.id }).subscribe(sentMessage => {
      this.messages.set([...this.messages(), sentMessage]);
      this.messageControl.reset();
      setTimeout(() => this.viewport.scrollToIndex(this.messages().length - 1), 100);
    });
  }

  logout() {
    this.usersService.logout();
    this.router.navigate(['/home']);
  }

  onScroll() {
    if (this.viewport.measureScrollOffset('top') === 0 && !this.loading && this.hasMoreMessages) {
      this.loadMoreMessages();
    }
  }
}
