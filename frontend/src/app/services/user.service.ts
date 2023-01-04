import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { users } from '../Data';
import { IUserLoginData } from '../Interfaces/IUserLogin';
import { User } from '../models/user';
import { USER_LOGIN_URL,REGISTER_URL } from '../shared/constants/urls';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private router:Router) {
  }

  registerUser(user:any) {
    return this.http.post<any>(REGISTER_URL,user)
  }

login(userLoginData:IUserLoginData){
console.log(userLoginData)
return this.http.post(USER_LOGIN_URL,userLoginData)


// return this.http.post<User>(USER_LOGIN_URL,userLogin).pipe(
//   tap({
//     next:(user) => {
//       this.userSubjet.next(user)
//       console.log('User Is In')
//     },
//     error: (errorResponse) => {
//      console.log('Incorrect Username or password')
//     }
//   })
// )
 }

 loggedIn() {
  return !!localStorage.getItem('token')
 }

 logoutUser () {
  localStorage.removeItem('token');
  this.router.navigate(['/'])
 }

 getToken() {
  return localStorage.getItem('token')
 }

}
