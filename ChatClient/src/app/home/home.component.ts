import {Component} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {Router, RouterOutlet} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {bacckendUrl} from '../models/config';
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
      if (user) {
        this.usesService.setCurrentUser(user.id);
        this.router.navigate(['/chat']);
      } else {
        this.usesService.createUser(this.form.value.login)
          .subscribe((userId) => {
            this.usesService.setCurrentUser(userId!);
            this.router.navigate(['/chat']);
          });

      }
    });
  }
}
