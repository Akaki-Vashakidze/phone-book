import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PhoneNumbersService } from '../services/phone-numbers.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private phoneNumbers: PhoneNumbersService
  ) {}
  signedIn: boolean = false;
  opened = false;
  dialogRef: any;
  numbersArray :any;

  ngOnInit(): void {
    this.phoneNumbers.getNumbers().subscribe(item=>{
      this.numbersArray = item;
    })
  }

  AddClick = () => {
    this.opened = !this.opened;
    this.router.navigate(['/numbers']);
  };

  getNewContact = (name: any, lastName: any, number: any) => {

    number = {
      name:name.value,
      lastName:lastName.value,
      number:number.value
    }

    this.phoneNumbers.phoneNumbers1.push(number)

    console.log(this.phoneNumbers.phoneNumbers1)
 };
}
