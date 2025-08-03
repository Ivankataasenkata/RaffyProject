import { CommonModule } from '@angular/common';
import { Component, inject, Input,  } from '@angular/core';
import { Meal } from '../../../../models';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { SliceTitle } from '../../../../shared/pipes/slice-title.pipe';


@Component({
  selector: 'app-meal-item',
  imports: [CommonModule, SliceTitle],
  templateUrl: './meal-item.html',
  styleUrl: './meal-item.css'
})
export class MealItem {
  @Input() meal!: Meal;
  @Input() mealType!: string;

  protected authService = inject(AuthService);
  protected router = inject(Router);
  readonly isLoggIn = this.authService.isLoggedIn;
  readonly currentUser = this.authService.currentUser;

  goToDetails(mealId: string): void {
    // console.log(`MEALID ${mealId}`);
    this.router.navigate(['/meal', mealId], {
      queryParams: {mealType: this.mealType}
    });
  }

}
