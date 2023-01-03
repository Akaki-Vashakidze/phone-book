import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerUserData : any;
  constructor(private userService:UserService,private snackBar: MatSnackBar, private router:Router) { }

  ngOnInit(): void {
  }

  checkValidity = (
    name: { value: string | any[]; },
    lastName: { value: string | any[]; },
    username: { value: string | any[]; },
    gender: { value: any; },
    gmail: { value: string; },
    number: { value: string | any[]; },
    password1: { value: number; },
    password2: { value: any; }
  ) => {
    if (name.value.length == 0) {
      this.snackBar.open('Name' + ' field must not be empty', 'close', {
        duration: 4000,
      });
      return;
    }
    if (lastName.value.length == 0) {
      this.snackBar.open('Lastname' + ' field must not be empty', 'close', {
        duration: 4000,
      });
      return;
    }
    if (username.value.length == 0) {
      this.snackBar.open('Username' + ' field must not be empty', 'close', {
        duration: 4000,
      });
      return;
    }
    if (!gender.value) {
      this.snackBar.open('Please select your gender', 'close', {
        duration: 4000,
      });
      return;
    }
    if (!gmail.value.split('').includes('@')) {
      this.snackBar.open('Please enter Gmail correctly', 'close', {
        duration: 4000,
      });
      return;
    }
    if (number.value.length < 9) {
      this.snackBar.open('Please enter Phone number correctly', 'close', {
        duration: 4000,
      });
      return;
    }
    if (password1.value < 5) {
      this.snackBar.open(
        'Password' + ' field number of letters must be greater than 5',
        'close',
        { duration: 4000 }
      );
      return;
    }
    if (password1.value != password2.value) {
      this.snackBar.open('Passwords does not match', 'close', {
        duration: 4000,
      });
      return;
    }
    this.snackBar.open('Conrgradulations! You have been registered!', 'close', {
      duration: 4000,
    });
    console.log(
      name.value,
      lastName.value,
      username.value,
      gmail.value,
      number.value,
      password1.value,
      password2.value
    );

    this.registerUserData = {
      name:name.value,
      lastName:lastName.value,
      username:username.value,
      gmail:gmail.value,
      number:number.value,
      password:password1.value
    }
    
    this.userService.registerUser(this.registerUserData)

  };

  signUp = (
    name: any,
    lastName: any,
    username: any,
    gender: any,
    gmail: any,
    number: any,
    password1: any,
    password2: any
  ) => {

    this.checkValidity(
      name,
      lastName,
      username,
      gender,
      gmail,
      number,
      password1,
      password2
    );
  };

  signIn = () => {
   this.router.navigate(['./login'])
  }

}
