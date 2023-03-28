import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  signUp(userObj: any) {
    return this.http.post<any>('http://localhost:8080/register', userObj)
  }

  login(loginObj: any) {
    return this.http.post<any>('http://localhost:8080/login', loginObj)
  }
}
