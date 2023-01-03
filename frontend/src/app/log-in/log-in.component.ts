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
  constructor(private userService: UserService,private router:Router) { }

  ngOnInit(): void {
  }

 LogIn = (Username1: any,Password1: any) => {
  this.userService.login({
    userName: Username1.value,
    password: Password1.value
  })

 }


 Register = () => {
this.router.navigate(['./registration'])
 }
}
