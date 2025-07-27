import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../../models/user';


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private _isLoggedIn = signal<boolean>(false);
    private _currentUser = signal<User | null>(null);
    private _users: User[] = [
        {id: '5fa64b162183ce1728ff371d', username: 'John', email: 'john.doe@gmail.com', phone: '+359 885 888 234'},
        {id: '5fa64ca72183ce1728ff3726', username: 'Jane',email: 'john.doe@gmail.com', phone: '+359 885 888 234'},
        {id: '5fa64a072183ce1728ff3719', username: 'David',email: 'john.doe@gmail.com', phone: '+359 885 888 234'},
    ];

    public isLoggedIn = this._isLoggedIn.asReadonly();
    public currentUser = this._currentUser.asReadonly();

    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) platformId: Object){
        this.isBrowser = isPlatformBrowser(platformId);
        if(this.isBrowser){
            const savedUser = localStorage.getItem('currentUser');
            if(savedUser){
                const user: User = JSON.parse(savedUser);
                this._currentUser.set(user);
                this._isLoggedIn.set(true);
            }
        }
        
    }

    login(email: string, password: string): boolean {
        if(email && password){
            const user = this._users[0];
            this._currentUser.set(user);
            this._isLoggedIn.set(true);

            localStorage.setItem('currentUser', JSON.stringify(user));

            return true;
        }

        return false;
    }

    register(username: string, email: string,phone: string, password: string, rePassword: string): boolean {
        if(username && email && phone && password && rePassword){
            const newUser: User = {
                id: `user_${Date.now}`,
                username: username,
                email: email,
                phone: phone
            };

            this._users.push(newUser);
            this._currentUser.set(newUser);
            this._isLoggedIn.set(true);

            localStorage.setItem('currentUser', JSON.stringify(newUser));

             return true;
        }

         return false;
    }

    logout(): void {
        this._currentUser.set(null);
        this._isLoggedIn.set(false);
        localStorage.removeItem('currentUser');
    }

    getCurrentUserId(): string | null{
        return this._currentUser()?.id || null;
    }

    update(user: User): void {
        const userIndex = this._users.findIndex(u => u.id == user.id);

        if(userIndex !== -1){
            this._users[userIndex] = user;

            this._currentUser.set(user);

            localStorage.setItem('currentUser', JSON.stringify(user));
        }
    }
}