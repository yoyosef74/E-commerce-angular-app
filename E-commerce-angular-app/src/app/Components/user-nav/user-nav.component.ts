import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { UserDataService } from '../../Core/service/user-data.service';
import { AuthService } from '../../Core/service/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../Core/service/cart.service';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UserNavComponent {

  constructor(
    private _userDataService: UserDataService,
    private _authService: AuthService,
    private _router: Router,
    private _cartService: CartService
  ){}

  items: MenuItem[] | undefined;
  logout: boolean = false;
  username: string = '' ;
  cartCount: number = 0 ;

  ngOnInit() {
    this.getUserName();
    this.getUserCartCount();
      this.items = [
          {
              label: 'Home',
              icon: 'pi pi-home',
              path: 'home'
          },
          {
              label: 'Products',
              icon: 'pi pi-sparkles',
              path: 'products'
          },
          {
              label: 'Categories',
              icon: 'pi pi-th-large',
              path: 'category'
          },

      ];
  }

  getUserName(): void {
    this._userDataService.userName.subscribe((next) => this.username = next);
  }

  getUserCartCount() : void {
    const id = localStorage.getItem('token')?? '';
    this._cartService.getCartCount(id).subscribe((next) => this.cartCount = next.cart.length);
  }

  logOut() : void {
    this._authService.logout().subscribe((next) => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this._router.navigate(['login']);
    });
  }
}
