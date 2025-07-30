import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Meal } from "../../models";


@Injectable({
    providedIn: 'root'
})

export class MealsService {
    //http://localhost:3000/breakfast
    private baseApiUrl = 'http://localhost:3000';

    constructor(private httpClient: HttpClient){}

    getBreakfastMeals(mealType: string): Observable<Meal[]> {

        const apiUrl = `${this.baseApiUrl}/${mealType}`;

        console.log(`In service breakfast - ${this.httpClient.get<Meal[]>(apiUrl)}`);

        return this.httpClient.get<Meal[]>(apiUrl);
    }

    getLunchMeals(mealType: string): Observable<Meal[]> {
        const apiUrl = `${this.baseApiUrl}/${mealType}`;

        console.log(`In service lunch - ${this.httpClient.get<Meal[]>(apiUrl)}`);

        return this.httpClient.get<Meal[]>(apiUrl);
    }


    getDinnerMeals(mealType: string): Observable<Meal[]> {
        const apiUrl = `${this.baseApiUrl}/${mealType}`;

        console.log(`In service lunch - ${this.httpClient.get<Meal[]>(apiUrl)}`);

        return this.httpClient.get<Meal[]>(apiUrl);
    }

    getMealByIdAndType(mealType: string, id: string): Observable<any> {


        const apiUrl = `${this.baseApiUrl}/${mealType}`;


        console.log(`In meal service - ${this.httpClient.get(`${apiUrl}/${id}`)}`);

        return this.httpClient.get(`${apiUrl}/${id}`);
    }    
}