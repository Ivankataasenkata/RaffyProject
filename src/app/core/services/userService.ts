import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../../models/user";
import { Observable } from "rxjs/internal/Observable";



@Injectable({
    providedIn: 'root'
})

export class UserService {
    private baseApiUrl = 'http://localhost:3000';
    apiUrl: string = `${this.baseApiUrl}/users`;

    constructor(private httpClient: HttpClient){}

    getUsers(): Observable<User[]> {
    
        return this.httpClient.get<User[]>(this.apiUrl);
    }

    saveUser(user: User): Observable<User> {
        return this.httpClient.post<User>(this.apiUrl, user);
    }

    updateUser(user: User): Observable<User> {
        return this.httpClient.put<User>(`${this.apiUrl}/${user._id}`, user);    
    }

    findUserByName(username: string) : Observable<User> {
        return this.httpClient.get<User>(`${this.apiUrl}/${username}`);
    }

    // updateUser(user: Partial<User> & { _id: string }): Observable<User> {
    //     return this.httpClient.put<User>(`${this.apiUrl}${user._id}`, user);
    // }
}