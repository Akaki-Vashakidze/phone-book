import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { users } from '../Data';
import { IUserLogin } from '../Interfaces/IUserLogin';
import { User } from '../models/user';
import { REGISTER_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {
  }

  registerUser(user:any) {
    return this.http.post<any>(REGISTER_URL,user)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

login(userLogin:IUserLogin){
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

}
