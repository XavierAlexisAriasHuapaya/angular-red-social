import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginRequest } from '../../interfaces/login-request.interface';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authenticationService = inject(AuthenticationService);
  private loginRequest!: LoginRequest;

  public form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  login() {
    const { email, password } = this.form.value;
    this.loginRequest = {
      username: email,
      password: password
    };
    this.authenticationService.login(this.loginRequest).subscribe({
      next: () => this.router.navigateByUrl('/main'),
      error: (message) => {
        Swal.fire({
          title: "Error",
          text: `${message}`,
          icon: "error"
        });
      }
    })
  }

}
