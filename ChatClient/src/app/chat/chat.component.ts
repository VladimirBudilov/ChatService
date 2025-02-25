import {Component, OnInit, signal} from '@angular/core';
import {User} from '../models/User';
import {Message} from '../models/Message';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {MatFormField} from '@angular/material/form-field';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatList, MatListItem} from '@angular/material/list';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {UsersService} from '../services/users.service';
import {Router} from '@angular/router';

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

  currentUser = signal<User | null>(null);
  users = signal<User[]>([]);
  messageControl = new FormControl('');

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {
    this.usersService.getCurrentUser().subscribe((user) => {
      console.log('current user in chat will be', user);
      this.currentUser.set(user);
    });
    this.usersService.getUsers().subscribe((users) => {
      this.users.set(users!);
    });
  }

  sendMessage() {

  }

  logout() {
    this.usersService.logout();
    this.router.navigate(['/home']);
  }
}
