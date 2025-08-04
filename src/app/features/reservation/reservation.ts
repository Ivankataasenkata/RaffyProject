import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../core/services/reservation.service';
import { Reservation } from '../../models/reservation'
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from '../../core/services/error.service';
import { SuccessService } from '../../core/services/success.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../models/user';
import { UserService } from '../../core/services/userService';

@Component({
  selector: 'app-reservation',
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.html',
  styleUrl: './reservation.css'
})
export class ReservationClass implements OnInit {

  // reservationName!: string;
  reservationId: string | null = '';
  reservationDate: string = '';
  tableType: string = '';
  hour: string = '';
  people!: number;

  isPreviewing: boolean = false;
  private errorService = inject(ErrorService);
  private seccessService = inject(SuccessService);

   protected authService = inject(AuthService);
   protected currentUser = this.authService.currentUser;

   protected userService = inject(UserService);

  constructor(private route: ActivatedRoute, private reservationService: ReservationService, private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.reservationId = this.route.snapshot.paramMap.get('id');
  }


  tableTypes = [
    { label: 'Single', value: 'single' },
    { label: 'Double', value: 'double' },
    { label: 'More than two', value: 'more' }
  ];

  hours = [
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
  ];

  get tableTypeLabel(): string {
    const found = this.tableTypes.find(t => t.value === this.tableType);
    return found ? found.label : '';
  }

  previewReservation() {

    if (!this.reservationDate || !this.tableType || !this.hour || !this.people || this.people < 1) {
      // alert('Please fill all fields with valid information before previewing.');
      this.errorService.setError('Please fill all fields with valid information before previewing.');
      return;
    }
    this.isPreviewing = true;
  }

  editReservation() {
    this.isPreviewing = false;
  }

  saveReservation() {

    console.log(this.currentUser()?._id);

    const resData: Reservation = {
      userId: this.currentUser()?._id?.toString() || "",
      date: this.reservationDate,
      tableType: this.tableType,
      hour: this.hour,
      people: this.people
    };

    console.log(resData);

    this.reservationService.saveReservation(resData).subscribe({
      next: (savedReservation) => {

        console.log("Reservation Id" + savedReservation?._id);

        this.seccessService.setSuccess(`Reservation saved for ${this.people} people on ${this.reservationDate} at ${this.hour} (${this.tableType} table).`);
        this.resetForm();

        const updatedUser: User = {
          _id: this.currentUser()?._id!,
          username: this.currentUser()!.username,  
          email: this.currentUser()!.email,
          password: this.currentUser()!.password,
          reservationId: savedReservation._id?.toString()
        };

        this.userService.updateUser(updatedUser).subscribe({
          next: (user) => {
            console.log('User updated with reservationId:', user);
            this.seccessService.setSuccess(`Reservation saved for ${this.people} people on ${this.reservationDate} at ${this.hour} (${this.tableType} table).`);
            
          },
          error: (err) => {
            console.error('Error updating user:', err);
          }
        })
      },
      error: (err) => {
        console.error('Error saving reservation:', err);
      }
    });
  }


  // updateReservation() {

  //   console.log(this.reservationId);
  //   if (!this.reservationId) {
  //     this.errorService.setError('No reservation selected to update');
  //     return;
  //   }

  //   const updatedReservation: Reservation = {
  //     date: this.reservationDate,
  //     tableType: this.tableType,
  //     hour: this.hour,
  //     people: this.people ?? 1
  //   };

  //   this.reservationService.updateReservation(this.reservationId, updatedReservation).subscribe({
  //     next: (res) => {
  //       this.seccessService.setSuccess('Reservation updated successfully!');
  //       this.resetForm();
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       this.errorService.setError('Failed to update reservation.');
  //     }
  //   });
  // }

resetForm() {
  setTimeout(() => {
    this.reservationDate = '';
    this.tableType = '';
    this.hour = '';
    this.people = 0;
    this.isPreviewing = false;
    this.cdr.detectChanges();
  });
}
}
