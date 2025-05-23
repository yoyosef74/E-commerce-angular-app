import { Component, Input } from '@angular/core';
import { IProducts } from '../../../Core/interfaces/http';
import { NgClass } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../Core/service/cart.service';
import { NotificationsService } from '../../../Core/service/notifications.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, ButtonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  constructor(private _cartService: CartService, private _notificationsService: NotificationsService){}

  @Input({ required: true }) isSmallCard: boolean = false;
  @Input({ required: true }) Products!: IProducts[];
  isAddedToCart: boolean = false;

  addToCart(productId: string): void {
    const userId = localStorage.getItem('token')?? '';

    this._cartService.addToCart({userId , productId}).subscribe((next) => {

      this._notificationsService.showSuccess('success', next.message);

      this._cartService.countOfCart.next(next.cart.length);

      this.isAddedToCart = true;

      const storedCart = localStorage.getItem('cartState');
      const cartState = storedCart? JSON.parse(storedCart) : {};

      cartState[productId] = true;
      localStorage.setItem('cartState', JSON.stringify(cartState));
    })
  }
}
