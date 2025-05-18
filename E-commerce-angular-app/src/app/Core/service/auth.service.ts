import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../apiRoot/baseUrl';
import { IRegister } from '../interfaces/http';
import { ILogin } from '../interfaces/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient : HttpClient) { }

  register(registerData : IRegister) : Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/users` , registerData);
  }

  login(loginData : ILogin): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/users/auth` , loginData);
  }

  authorized() : boolean {
    if(localStorage.getItem('token') != null){
      return true
    }
    else return false
  }


}
