import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Meal } from '../../../../models';
import { MealsService } from '../../../../core/services/meals.service';
import { MealItem } from '../meal-item/meal-item';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-meal-board',
  imports: [MealItem, CommonModule],
  templateUrl: './meal-board.html',
  styleUrl: './meal-board.css'
})
export class MealBoard implements OnInit {
  subscriptions: Subscription[] = [];
  mealType: string = '';
  meals$!: Observable<Meal[]>;
  meals: Meal[] = [];

  constructor(private route: ActivatedRoute, private mealsService: MealsService) {
    //  this.meals$ = this.mealsService.getBreakfastMeals();
  }

  ngOnInit(): void {
    const url = this.route.snapshot.url.map(segment => segment.path).join('/');

    console.log(`mealtypy - ${this.mealType}`);

    if (url.includes('breakfast')) {
      this.mealType = 'breakfast';
      
    }else if (url.includes('lunch')){
      this.mealType = 'lunch';
      
    }else if (url.includes('dinner')){
      this.mealType = 'dinner';
    }

    switch (this.mealType) {
      case 'breakfast':
        this.meals$ = this.mealsService.getBreakfastMeals(this.mealType);
        
        break;
      case 'lunch':
        this.meals$ = this.mealsService.getLunchMeals(this.mealType);
        
        break;
      case 'dinner':
        this.meals$ = this.mealsService.getDinnerMeals(this.mealType);
        console.log("in meal-board -  " + this.meals);
        break;
      default:
        this.meals$ = of([]);  // empty observable if no valid meal type
    }

  }
}
