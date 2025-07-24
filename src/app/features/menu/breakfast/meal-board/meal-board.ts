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
  // meals$!: Observable<Meal[]>;
  meals: Meal[] = [];

  constructor(private route: ActivatedRoute, private mealsService: MealsService) {
    //  this.meals$ = this.mealsService.getBreakfastMeals();
  }

  ngOnInit(): void {
    const url = this.route.snapshot.url.map(segment => segment.path).join('/');
  if (url.includes('breakfast')) {
    this.mealType = 'breakfast';
    this.subscriptions.push(
      this.mealsService.getBreakfastMeals().subscribe((response: Meal[]) => this.meals = response)
      
    );

    console.log(this.meals);
  }

    // this.mealType = this.route.snapshot.paramMap.get('mealType') || '';

    // switch (this.mealType) {
    //   case 'breakfast':

    //     console.log(this.meals);

    //     this.subscriptions.push(this.mealsService.getBreakfastMeals().subscribe((response: Meal[]) => {
    //       this.meals = response;
    //       // console.log(this.meals)
    //     }));

    //     break;
    //   // case 'lunch':
    //   //   this.meals$ = this.mealsService.getLunchMeals();
    //   //   break;
    //   // case 'dinner':
    //   //   this.meals$ = this.mealsService.getDinnerMeals();
    //   //   break;
    //   default:
    //   // this.meals$ = of([]);  
    // }

  }
}
