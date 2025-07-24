import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Meal } from "../../models";


@Injectable({
    providedIn: 'root'
})

export class MealsService {
    //http://localhost:3000/breakfast
    private apiUrl = 'http://localhost:3000/breakfasts';

    constructor(private httpClient: HttpClient){}

    getBreakfastMeals(): Observable<Meal[]> {
         console.log(`In service ${this.httpClient.get<Meal[]>(this.apiUrl)}`);
        return this.httpClient.get<Meal[]>(this.apiUrl);
    }
}