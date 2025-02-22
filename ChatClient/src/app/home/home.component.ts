import {Component} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {Router, RouterOutlet} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    RouterOutlet
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      name: ['']
    });
  }

  onSubmit() {
    const formData = this.form.value;
    this.http.post('your-backend-url/login', formData).subscribe(() => {
      this.router.navigate(['/chat']);
    });
  }
}
