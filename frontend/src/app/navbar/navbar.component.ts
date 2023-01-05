import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PhoneNumbersService } from '../services/phone-numbers.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private phoneNumbers: PhoneNumbersService,
    private userService:UserService
  ) {}
  signedIn: boolean = false;
  opened = false;
  dialogRef: any;
  numbersArray :any;

  ngOnInit(): void {
    this.phoneNumbers.getNumbers().subscribe(item=>{
      this.numbersArray = item;
    })
   this.signedIn = this.userService.loggedIn();
   this.userService.SignedIn.subscribe(item=>{

    this.signedIn=item
    console.log(this.signedIn)
   })
  }

 logoutUser() {
  this.userService.logoutUser();
  this.userService.NavbarButtons(!!localStorage.getItem('token'))
 }

  AddClick = () => {
    this.opened = !this.opened;
    this.router.navigate(['/numbers']);
  };

  getNewContact = (name: any, number: any) => {

    number = {
      name:name.value,
      number:number.value
    }

    this.phoneNumbers.phoneNumbers1.push(number)

    console.log(this.phoneNumbers.phoneNumbers1)
 };
}
