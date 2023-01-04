import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
returnUrl = '';
logInData : any;
  constructor(private userService: UserService,private router:Router) { }

  ngOnInit(): void {
  }

 LogIn = (Username1: any,Password1: any) => {
  this.logInData = {
     userName: Username1.value,
     password: Password1.value
  }
  this.userService.login(this.logInData)
  .subscribe(
    (res :any) => {
      console.log(res)
      localStorage.setItem('token',res.token)
    },
    err => console.log(err)
  )
  console.log(this.logInData)
 }


 Register = () => {
this.router.navigate(['./registration'])
 }
}
