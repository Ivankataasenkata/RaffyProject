import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterModule,CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  selectedMeal: string | null = null;

  selectMeal(mealType: string) {
    this.selectedMeal = mealType;
  }
}
