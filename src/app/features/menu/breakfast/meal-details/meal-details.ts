import { Component, inject, Input, input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meal } from '../../../../models';
import { MealsService } from '../../../../core/services/meals.service';


@Component({
  selector: 'app-meal-details',
  imports: [],
  templateUrl: './meal-details.html',
  styleUrl: './meal-details.css'
})
export class MealDetails implements OnInit{
  @Input() mealType!: string;

  meal: Meal | undefined;
  mealId: string = '';
 
  constructor(private route: ActivatedRoute, private mealService: MealsService){}

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

    this.mealService.getMealByIdAndType(mealType, this.mealId).subscribe((data: Meal) => {
      this.meal = data;
    });
  });
}

}
