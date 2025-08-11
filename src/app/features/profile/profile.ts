import { Component, inject, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../models/user';
import { ReservationService } from '../../core/services/reservation.service';
import { Reservation } from '../../models';
import { ErrorService } from '../../core/services/error.service';
import { UserService } from '../../core/services/userService';
import { CommonModule } from '@angular/common';
import { SuccessService } from '../../core/services/success.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
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
  reservationForm: FormGroup;

  constructor(private router: Router) {
    // this.user = this.currentUser() || null;

    this.profileForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });

    this.reservationForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      tableType: ['', [Validators.required]],
      hour: ['', [Validators.required]],
      people: ['', [Validators.required, Validators.min(1)]]
    });

    // this.loadReservation();
    // console.log('load reservation');
  }
  ngOnInit(): void {

    this.user = this.currentUser() || null;

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
         
        if (user.reservationId) {
          this.reservationService.getReservationById(user.reservationId).subscribe({
            next: (data) => {
               this.reservation = data;


               this.reservationForm.patchValue({
                date: this.reservation.date,
                tableType: this.reservation.tableType,
                hour: this.reservation.hour,
                people: this.reservation.people
               });

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
      this.errorService.setError('Please fill all fields with valid information before saving.');
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

    this.reservationService.updateReservation(this.reservation?._id || "" , reservationNew).pipe(take(1)).subscribe({
      next: (reservation: Reservation) => {
      
      this.seccessService.setSuccess(`Reservation updated successfully.`);
      
      this.isReservationOpen = false;

       this.router.navigate(['/home']);
    },
    error: (err) => {
      this.errorService.setError('Error updating reservation:');

    }
    });

  }

  editReservation() {
    this.isReservationEditMode = true;
    this.isReservationOpen = true;    

    
    this.reservationForm.patchValue({ 
      date: this.reservation?.date,
      tableType: this.reservation?.tableType,
      hour: this.reservation?.hour,
      people: this.reservation?.people
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
    console.log(this.reservation?._id);
     this.reservationService.deleteReservation(this.reservation?._id || "").subscribe({
      next: (response: Reservation) => {
        if(response){
          this.seccessService.setSuccess(`Reservation deleted successfully : ${response}`);
          this.reservation = null;
          this.isReservationOpen = false;
          this.isReservationEditMode = false;
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.errorService.setError('Error deleting reservation');
      } 
     });

    // For demo: just clearing reservation data locally

    // Close the accordion panel since reservation is gone

    // Also exit reservation edit mode in case it was active
  }
}
