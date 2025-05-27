import { Routes } from '@angular/router';
import { authGuard } from './Core/guards/auth.guard';
import { registerGuard } from './Core/guards/register.guard';
import { myDetailsResolver } from './Core/guards/my-details.resolver';

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
        canDeactivate: [registerGuard]
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
    path : '',
    loadComponent : () => import ('./Layouts/user-layout/user-layout.component').then(
      (c) => c.UserLayoutComponent
    ),
    canActivate: [authGuard],
    children: [
      {
        path: '', redirectTo: 'home', pathMatch:'full'
      },
      {
        path: 'home' ,
        loadComponent: () => import('./Pages/home/home.component').then((c) => c.HomeComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('./Pages/cart/cart.component').then((c) => c.CartComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./Pages/products/products.component').then((c) => c.ProductsComponent)
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./Pages/details/details.component').then((c) => c.DetailsComponent),
        resolve: { details: myDetailsResolver },
      },
      {
        path: 'category',
        loadComponent: () => import('./Pages/category/category.component').then((c) => c.CategoryComponent)
      },
      {
        path: 'specificCategory/:type',
        loadComponent: () => import('./Pages/specific-category/specific-category.component').then((c) => c.SpecificCategoryComponent)
      }
    ]
  },

];
