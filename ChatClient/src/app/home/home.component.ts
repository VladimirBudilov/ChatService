import {Component} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {Router, RouterOutlet} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {backendApiUrl} from '../models/config';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-home',
  imports: [MatFormField, MatInput, ReactiveFormsModule, RouterOutlet],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private usesService: UsersService, private router: Router) {
    this.form = this.fb.group({
      login: [''],
    });
  }

  onSubmit() {
    this.usesService.getUser(this.form.value.login).subscribe((user) => {
      if (user !== null) {
        console.log('User exists', user);
        this.usesService.setCurrentUser(user.login);
        this.router.navigate(['/chat']);
      } else {
        console.log('User not exists, creating... with login:', this.form.value.login);
        this.usesService.createUser(this.form.value.login)
          .subscribe((login) => {
            this.usesService.setCurrentUser(login!);
            this.router.navigate(['/chat']);
          });

      }
    });
  }
}
