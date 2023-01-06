import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { phoneNumbers } from '../Data';
import { ADD_NUMBERS_URL, NUMBERS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class PhoneNumbersService {

  UserData : any;
  phoneNumbers1 = phoneNumbers;

  constructor(private http:HttpClient) { }

  updateUserData(data: any) {
    this.UserData = data;
  }

  addNumber(userInfo:any) {
    return this.http.post<any>(ADD_NUMBERS_URL,userInfo)
   }

  getNumbers () {
    return this.http.get<any>(NUMBERS_URL)
  }

}
