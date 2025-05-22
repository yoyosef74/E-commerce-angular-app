import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../apiRoot/baseUrl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _httpClient: HttpClient) { }

  getCartCount(id: string): Observable<any> {
    return this._httpClient.get(`${baseUrl}/my-cart/${id}`);
  }

  addToCart(userData:{productId: string, userId: string}): Observable<any> {
    return this._httpClient.post(`${baseUrl}/add-to-cart`, userData);
  }
}
