import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { registerRequest } from '../../interfaces/register-request.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
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
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.required]
  });

  public register() {
    const { name, lastname, username, password, email } = this.formRegister.value;
    this.registerRequest = {
      name: name,
      lastname: lastname,
      username: username,
      password: password,
      email: email
    }
    this.registerService.register(this.registerRequest).subscribe({
      next: () => {
        this.router.navigateByUrl('/auth/login');
      },
      error: (err) => {

      }
    })
  }

}
