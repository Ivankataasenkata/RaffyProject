import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  // protected authService = inject(AuthService);
  // readonly isLoggIn = this.authService.isLoggedIn;
  // readonly currentUser = this.authService.currentUser;
}
