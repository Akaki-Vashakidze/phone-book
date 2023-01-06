import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { users } from '../Data';
import { IUserLoginData } from '../Interfaces/IUserLogin';
import { User } from '../models/user';
import { USER_LOGIN_URL, REGISTER_URL } from '../shared/constants/urls';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  SignedIn = new EventEmitter<any>();
  ActiveUser = new EventEmitter<any>()
  constructor(private http: HttpClient, private router: Router) {}

  registerUser(user: any) {
    this.ActiveUser.emit(user.username)
    localStorage.setItem('ActiveUsername',user.username)
    return this.http.post<any>(REGISTER_URL, user);
  }

  login(userLoginData: IUserLoginData) {
    this.ActiveUser.emit(userLoginData.username)
    localStorage.setItem('ActiveUsername',userLoginData.username)
    return this.http.post(USER_LOGIN_URL, userLoginData);
  }

  loggedIn() {
    console.log(!!localStorage.getItem('token'));
    return !!localStorage.getItem('token');
  }

  NavbarButtons(item: any) {
    this.SignedIn.emit(item);
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
