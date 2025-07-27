import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  protected authService = inject(AuthService);
  protected currentUser = this.authService.currentUser;

  private formBuilder = inject(FormBuilder);
  profileForm: FormGroup;
  isEditMode: boolean = false;

  constructor(){
    this.profileForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

    get username(): AbstractControl<any, any> | null {
    return this.profileForm.get('username');
  }

  get email(): AbstractControl<any, any> | null {
    return this.profileForm.get('email');
  }

  get phone(): AbstractControl<any, any> | null {
    return this.profileForm.get('phone');
  }

  /////////////////////////////////////////

  get isUsernameValid(): boolean {
    return this.username?.invalid && (this.username?.dirty || this.username?.touched) || false;
  }

  get isEmailValid(): boolean {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched) || false;
  }

  //////////////////////////////////////////
  get usernameErrorMessage(): string {
    if (this.username?.errors?.['required']) {
      return 'Username is required!';
    }

    if (this.username?.errors?.['minlength']) {
      return 'Username should be at least 5 characters long'
    }

    return '';
  }

  get emailErrorMessage(): string {
    if (this.email?.errors?.['required']) {
      return 'Email is required!';
    }

    if (this.email?.errors?.['email']) {
      return 'Email is not valid!';
    }

    return '';
  }

  onEdit(): void {
    const user = this.currentUser();

    this.profileForm.patchValue({
      username: user?.username,
      email: user?.email,
      phone: user?.phone
    });

    this.isEditMode = true;
  }

  onCancel(): void {
    this.isEditMode = false;
    this.profileForm.reset();
  }

  onSave(): void {
    if(this.profileForm.valid){
      const {username, email, phone} = this.profileForm.value;

      const user = <User> {
        username: username,
        email: email,
        phone: phone
      }

      this.authService.update(user);

      this.isEditMode = false;
      this.profileForm.reset();
    }
  }
}
