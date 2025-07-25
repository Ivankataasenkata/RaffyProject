import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  protected authService = inject(AuthService);
  protected router = inject(Router);
  readonly isLoggIn = this.authService.isLoggedIn;
  readonly currentUser = this.authService.currentUser;

   logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
