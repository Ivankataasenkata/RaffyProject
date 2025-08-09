import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../models/user';
import { ReservationService } from '../../core/services/reservation.service';
import { Reservation } from '../../models';
import { ErrorService } from '../../core/services/error.service';
import { UserService } from '../../core/services/userService';
import { CommonModule } from '@angular/common';
import { SuccessService } from '../../core/services/success.service';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  protected authService = inject(AuthService);
  protected currentUser = this.authService.currentUser;
  

  protected reservationService = inject(ReservationService);
  reservation?: Reservation | null;

  protected userService = inject(UserService);
  user: User | null = null;

  protected errorService = inject(ErrorService);
  protected seccessService = inject(SuccessService);

  private formBuilder = inject(FormBuilder);
  profileForm: FormGroup;
  isEditMode: boolean = false;

  isReservationOpen = false;
  isReservationEditMode = false;
  reservationObj: Reservation = {} as Reservation;
  reservationForm: FormGroup;

  constructor() {
    this.user = this.currentUser() || null;

    this.profileForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });

    this.reservationForm = this.formBuilder.group({
      date: [''],
      tableType: [''],
      hour: [''],
      people: ['']
    });

    this.loadReservation();
    console.log('load reservation');
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

  /////////////////////////////////////////

  toggleReservation() {
    this.isReservationOpen = !this.isReservationOpen;
  }

  loadReservation() {
    this.userService.findUserByName(this.user?.username!).subscribe({
      next: (user: User) => {
         
        console.log(user.reservationId);
        if (user.reservationId) {
          this.reservationService.getReservationById(user.reservationId).subscribe({
            next: (data) => {
               this.reservation = data;
               console.log(this.reservation);
            },
            error: () => {
              this.errorService.setError("Connot get reservation");
              this.reservation = null;
            }
          });
        } else {
          this.errorService.setError("User don not have a reservation");
          this.reservation = null;
        }
      }
    })

  }

  onEdit(): void {
    const user = this.currentUser();

    this.profileForm.patchValue({
      username: user?.username,
      email: user?.email
    });

    this.isEditMode = true;
  }

  onCancel(): void {
    this.isEditMode = false;
    this.profileForm.reset();
  }

   onCancelReservation(): void {
    this.isReservationEditMode = false;

    // Optionally reset the reservation form to original reservation data to discard edits
    if (this.reservation) {
      this.reservationForm.patchValue({
        date: this.reservation.date || '',
        tableType: this.reservation.tableType || '',
        hour: this.reservation.hour || '',
        people: this.reservation.people || ''
      });
    } else {
      // If no reservation data exists, reset the form completely
      this.reservationForm.reset();
    }
  }

  onSave(): void {
    if (this.profileForm.valid) {
      const { username, email } = this.profileForm.value;

      const user = <User>{
        username: username,
        email: email
      }

      this.authService.update(user);

      this.isEditMode = false;
      this.profileForm.reset();
    }
  }

  saveReservation() {
     if (this.reservationForm.invalid) {
      // Optionally, mark fields as touched to show validation errors
      this.reservationForm.markAllAsTouched();
      return;
    }

    const updatedReservation = this.reservationForm.value;
    const reservationNew = {
      ...this.reservation,
      ...updatedReservation
    };

    this.isReservationEditMode = false;
    this.isReservationOpen = false;

    console.log('Resrevation ID: ' + this.reservation?._id);
    console.log('reservation :  ' + JSON.stringify(reservationNew));

    this.reservationService.updateReservation(this.reservation?._id || "" , reservationNew).subscribe({
      next: (reservation: Reservation) => {
      console.log('reservation succeasfully updaeted:', reservation);
      this.seccessService.setSuccess(`Reservation updated successfully.`);
      // Optionally close the accordion or perform other UI updates
      this.isReservationOpen = false;
    },
    error: (err) => {
      this.errorService.setError('Error updating reservation:');
      console.error('Error updating reservation:', err);
    }
    });

  }

  editReservation() {
    this.isReservationEditMode = true;
    this.isReservationOpen = true;    

    
    this.reservationForm.patchValue({ 
      date: this.reservationObj.date,
      tableType: this.reservationObj.tableType,
      hour: this.reservationObj.hour,
      people: this.reservationObj.people
    });

    // Optionally: close the accordion since now editing or keep open
    this.isReservationOpen = true;
  }

  deleteReservation(){
    const confirmed = confirm('Are you sure you want to delete your reservation?');
    if (!confirmed) {
      return; // User cancelled deletion
    }

    // Call service or logic to delete reservation here, e.g.:
     this.reservationService.deleteReservation(this.reservation?._id || "");

    // For demo: just clearing reservation data locally
    this.reservation = null;

    // Close the accordion panel since reservation is gone
    this.isReservationOpen = false;

    // Also exit reservation edit mode in case it was active
    this.isReservationEditMode = false;
  }
}
