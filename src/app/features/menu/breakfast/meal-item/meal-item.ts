import { CommonModule } from '@angular/common';
import { Component, Input,  } from '@angular/core';
import { Meal } from '../../../../models';

@Component({
  selector: 'app-meal-item',
  imports: [CommonModule],
  templateUrl: './meal-item.html',
  styleUrl: './meal-item.css'
})
export class MealItem {
  @Input() meal!: Meal;
}
