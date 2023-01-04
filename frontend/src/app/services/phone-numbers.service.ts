import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { phoneNumbers } from '../Data';
import { NUMBERS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class PhoneNumbersService {

  phoneNumbers1 = phoneNumbers;

  constructor(private http:HttpClient) { }

  getNumbers () {
    return this.http.get<any>(NUMBERS_URL)
  }

}
