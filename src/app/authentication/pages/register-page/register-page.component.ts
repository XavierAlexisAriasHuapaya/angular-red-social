import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { registerRequest } from '../../interfaces/register-request.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private registerService = inject(RegisterService);
  private registerRequest!: registerRequest;

  public formRegister: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.required]
  });

  public register() {
    const { username, password, email } = this.formRegister.value;
    this.registerRequest = {
      username: username,
      password: password,
      email: email
    }
    this.registerService.register(this.registerRequest).subscribe({
      next: () => {
        this.router.navigateByUrl('/auth/login');
      },
      error: (err) => {
        console.log(`Error: ${err}`);
      }
    })
  }

}
