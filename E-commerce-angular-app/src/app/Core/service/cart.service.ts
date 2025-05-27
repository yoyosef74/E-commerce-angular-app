import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../apiRoot/baseUrl';
import { HttpClient } from '@angular/common/http';
import { IProducts } from '../interfaces/http';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _httpClient: HttpClient,  private _notifecationsService: NotificationsService) { }

countOfCart: BehaviorSubject<number> = new BehaviorSubject(
    (
      JSON.parse(localStorage.getItem('cartState') ?? '[]') as IProducts[]
    ).length
  );

  // addToCart(product: IProducts) {
  //   const storedCart = localStorage.getItem('cartState');
  //   const cart: IProducts[] = storedCart ? JSON.parse(storedCart) : [];

  //   if (!product.isAddedToCart) {
  //     product.isAddedToCart = true;
  //     cart.push(product);
  //     localStorage.setItem('cartState', JSON.stringify(cart));
  //     this._notifecationsService.showSuccess('Success', 'Item added to cart');
  //     this.countOfCart.next(cart.length);
  //   } else {
  //     // this._notifecationsService.showError('error', 'is item is added');
  //   }
  // }
  addToCart(product: IProducts) {
    const storedCart = localStorage.getItem('cartState');

    // Parse the stored cart and ensure it's an array, fallback to []
    let cart: IProducts[] = [];
    try {
      const parsed = storedCart ? JSON.parse(storedCart) : [];
      cart = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      cart = [];
    }

    if (!product.isAddedToCart) {
      product.isAddedToCart = true;
      cart.push(product);
      localStorage.setItem('cartState', JSON.stringify(cart));
      this._notifecationsService.showSuccess('Success', 'Item added to cart');
      this.countOfCart.next(cart.length);
    } else {
      // Item already added
    }
  }


  isAddedToCart(product: IProducts): boolean {
    const storedCart = localStorage.getItem('cartState');
    const cartState = storedCart ? JSON.parse(storedCart) : [];
    const isAdded = cartState.some((item: IProducts) => item.id === product.id);
    return isAdded;
  }
}
