import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path : '' ,
    loadComponent: () => import('./Layouts/auth-layout/auth-layout.component').then(
      (c) => c.AuthLayoutComponent
    ),
    children: [
      {
        path : '' , redirectTo : 'login' , pathMatch : 'full'
      },

      {
        path : 'register',
        loadComponent: () => import('./Pages/register/register.component').then(
          (c) => c.RegisterComponent
        ),
      },

      {
        path : 'login',
        loadComponent: () => import('./Pages/login/login.component').then(
          (c) => c.LoginComponent
        ),
      }
    ]
  },

  {
    path : 'user',
    loadComponent : () => import ('./Layouts/user-layout/user-layout.component').then(
      (c) => c.UserLayoutComponent
    ),
  },

];
