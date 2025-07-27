import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private authService = inject(AuthService);
  private router = inject(Router);

  private formBuilder = inject(FormBuilder);
  loginForm: FormGroup;

  constructor(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get isEmailvalid(): boolean {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched) || false;
  }

  get isPasswordValid() : boolean {
    return this.password?.invalid && (this.password?.dirty || this.password?.touched) || false;
  }

  get emailErrorMessage() : string {
    if(this.email?.errors?.['required']) {
      return 'Email is required!';
    }

    if(this.email?.errors?.['emailValidator']) {
      return 'Email is not valid';
    }

    return '';
  }
  get passwordErrorMessage(): string {
    if (this.password?.errors?.['required']) {
      return 'Password is required!';
    }

    if(this.password?.errors?.['minldength']){
      return 'Password must be at least 5 characters long';
    }

    return '';
  }
 
  onSubmit(): void {
 
    if(this.loginForm.valid){
      const response: boolean = this.authService.login(this.email?.value, this.password?.value);

      if(response === true){
        this.router.navigate(['/home']);
      }else {
        this.isFormGroupTouched();
      }
    }
  }

  private isFormGroupTouched (): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    })
  }
}

  export function emailValidator(emailControl: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;

    const email = emailControl.value;

    if(email && !emailRegex.test(email)){
      return { emailValidator: true};
    }
    return null;
  }
