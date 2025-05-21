import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../apiRoot/baseUrl';
import { baseUrlProducts } from '../apiRoot/baseUrl';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userName: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('username') || '')
  constructor(private _httpClient: HttpClient) { }

  getCartCount(id: string): Observable<any> {
    return this._httpClient.get(`${baseUrl}/my-cart/${id}`);
  }

  allProducts(): Observable<any>{
    return this._httpClient.get(`${baseUrlProducts}/products`)
  }
}
