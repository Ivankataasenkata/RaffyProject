import { Routes } from '@angular/router';
import {NotFound} from './shared/components/not-found/not-found';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home').then(c => c.Home)
    },
    {
        path: 'about',
        loadComponent: () => import('./features/about/about').then(c => c.About)
    }, 
    {
        path: 'menu',
        loadComponent: () => import('./features/menu/menu').then(c => c.Menu),
        // children: [
        //     {
        //         path: ':mealType',
        //         loadComponent: () => import('./features/menu/breakfast/meal-board/meal-board').then(c => c.MealBoard)
        //     }
        // ]
    }, 
    {
        path: 'breakfast',
        loadComponent: () => import('./features/menu/breakfast/meal-board/meal-board').then(c => c.MealBoard)
    },
    {
        path: 'lunch',
        loadComponent: () => import('./features/menu/breakfast/meal-board/meal-board').then(c => c.MealBoard)
    },
    {
        path: 'dinner',
        loadComponent: () => import('./features/menu/breakfast/meal-board/meal-board').then(c => c.MealBoard)
    },
    {
        path: 'meal/:id',
        loadComponent: () => import('./features/menu/breakfast/meal-details/meal-details').then(c =>c.MealDetails)
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(c => c.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then(c => c.Register)
    },
    {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile').then(c => c.Profile)
    },
    {
        path: 'reservation',
        loadComponent: () => import('./features/reservation/reservation').then(c => c.ReservationClass)
    },
    {
        path: 'logout',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFound
    }
];   
