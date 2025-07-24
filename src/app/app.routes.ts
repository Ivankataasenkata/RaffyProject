import { Routes } from '@angular/router';

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
    }
];   
