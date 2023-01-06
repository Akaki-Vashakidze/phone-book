import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADD_NUMBERS_URL, NUMBERS_URL } from '../shared/constants/urls';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhoneNumbersService {

  userUsername:any;
  UserData : any;

  constructor(private http:HttpClient) { }

  updateUserData(data: any) {
    this.UserData = data;
  }

  updateUserUsername (data:any) {
    this.userUsername = data.username;
  }

  addNumber(numberInfo:any) {
    let info = {
      userName:this.userUsername,
      numberInfo
    }
    console.log(info)
    return this.http.post<any>(ADD_NUMBERS_URL,info)
   }

  getNumbers () {
    return this.http.get<any>(NUMBERS_URL)
  }

}
