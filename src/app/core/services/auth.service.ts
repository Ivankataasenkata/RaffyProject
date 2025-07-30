import { Injectable, signal, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../../models/user';
import { UserService } from './userService';
import { BehaviorSubject, first, map, Observable, of, take, tap } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    protected userService = inject(UserService);
    // _users$: Observable<User[]>;
    private _users$ = new BehaviorSubject<User[]>([]);
    public users$ = this._users$.asObservable(); 

    private _isLoggedIn = signal<boolean>(false);
    private _currentUser = signal<User | null>(null);
    // private _users: User[] = [
    //     {_id: '5fa64b162183ce1728ff371d', username: 'John', email: 'john.doe@gmail.com', phone: '+359 885 888 234'},
    //     {_id: '5fa64ca72183ce1728ff3726', username: 'Jane',email: 'john.doe@gmail.com', phone: '+359 885 888 234'},
    //     {_id: '5fa64a072183ce1728ff3719', username: 'David',email: 'john.doe@gmail.com', phone: '+359 885 888 234'},
    // ];

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
        
        this.loadUsers();
    }

    login(email: string, password: string): Observable<boolean> {
        if(!email || !password){
           return of(false);
        }

        return this._users$.pipe(
            first(),
            map(users => {
                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    this._currentUser.set(user);
                    this._isLoggedIn.set(true);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    return true;
                }
                return false;
            })
        )
    }

//     this.authService.login(email, password).subscribe(success => {
//   if (success) {
//     console.log('Login successful');
//   } else {
//     console.log('Invalid credentials');
//   }
// });

    register(username: string, email: string, password: string, rePassword: string): Observable<boolean> {
        if(!username || !email || !password || !rePassword || password !== rePassword){
           return of(false);
        }

         const newUser: User = {
                username: username,
                email: email,
                password: password
        };

        console.log(newUser);

        return this.userService.saveUser(newUser).pipe(
            map((user: User) => {
                this._currentUser.set(user);
                this._isLoggedIn.set(true);
                localStorage.setItem('currentUser', JSON.stringify(user));
                return true;
            })
        );
    }

    logout(): void {
        this._currentUser.set(null);
        this._isLoggedIn.set(false);
        localStorage.removeItem('currentUser');
    }

    getCurrentUserId(): string | null{
        return this._currentUser()?._id || null;
    }

   update(user: User): void {

    const currentUserId = this.getCurrentUserId();
        if (!currentUserId || currentUserId !== user._id) {
            console.warn('User ID mismatch or no current user');
            return;
         }

        this.userService.updateUser(user).subscribe(updatedUser => {
            const users = this._users$.getValue();
            const updatedUsers = users.map(u =>
                u._id === updatedUser._id ? updatedUser : u
            );
            this._users$.next(updatedUsers);

            // Update current user reference and localStorage
            this._currentUser.set(updatedUser);
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        }, error => {
            console.error('Failed to update user', error);
        });
    }

    private loadUsers() {
    this.userService.getUsers().subscribe(users => {
        this._users$.next(users);
    });
}
}