import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Reservation } from "../../models";


@Injectable({
    providedIn: 'root'
})

export class ReservationService {
    private apiUrl = 'http://localhost:3000/reservation';

    constructor(private httpClient: HttpClient){}

    getReservationById(id: string): Observable<Reservation> {
        return this.httpClient.get<Reservation>(`${this.apiUrl}/${id}`);
    }

    saveReservation(reservation: Reservation) : Observable<Reservation> {
         return this.httpClient.post<Reservation>(this.apiUrl, reservation);
    }

    updateReservation (id: string, reservation: Reservation) : Observable<Reservation> {
        const url = `${this.apiUrl}/${id}`;
        return this.httpClient.put<Reservation>(url, reservation);
    }

    deleteReservation(id: string) : Observable<Reservation> {
        const url = `${this.apiUrl}/${id}`;
        return this.httpClient.delete<Reservation>(url);
    }
}