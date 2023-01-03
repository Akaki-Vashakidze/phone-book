import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { users } from '../Data';
import { IUserLogin } from '../Interfaces/IUserLogin';
import { User } from '../models/user';
import { USER_LOGIN_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static users: any;

  private userSubjet = new BehaviorSubject<User>(new User())
  public userObservable:Observable<User>;
  users:any = users;

  constructor(private http:HttpClient) {
    this.userObservable = this.userSubjet.asObservable()
  }

login(userLogin:IUserLogin):Observable<User>{
return this.http.post<User>(USER_LOGIN_URL,userLogin).pipe(
  tap({
    next:(user) => {
      this.userSubjet.next(user)
      console.log('User Is In')
    },
    error: (errorResponse) => {
     console.log('Incorrect Username or password')
    }
  })
)
}

}
