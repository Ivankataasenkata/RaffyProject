import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Meal } from '../../../../models';
import { MealsService } from '../../../../core/services/meals.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-meal-details',
  imports: [CommonModule],
  templateUrl: './meal-details.html',
  styleUrl: './meal-details.css'
})
export class MealDetails implements OnInit {
  @Input() mealType!: string;

  meal$!: Observable<Meal>;
  meal: Meal | undefined;
  mealId: string = '';

  constructor(private route: ActivatedRoute, private mealService: MealsService, private router: Router) { }

  // ngOnInit(): void {
  //   const mealType = this.route.snapshot.queryParamMap.get('mealType')!;
  //   this.mealId = this.route.snapshot.paramMap.get('id')!;

  //   console.log(`mealtype - ${mealType}`);

  //   this.mealService.getMealByIdAndType(mealType,this.mealId).subscribe((data: Meal) => {
  //     this.meal = data;
  //   });
  // }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const mealType = params.get('mealType')!;
      this.mealId = this.route.snapshot.paramMap.get('id')!;

      console.log(`mealtype - ${mealType}`);

      this.meal$ = this.mealService.getMealByIdAndType(mealType, this.mealId).pipe(map((data: Meal) => {
        return data;
      }));

    });
  }

  goBackToMenu() {
    this.router.navigate(['/menu']);
  }

}
