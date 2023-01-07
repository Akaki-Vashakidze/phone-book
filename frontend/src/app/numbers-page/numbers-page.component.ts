import { Component, OnInit } from '@angular/core';

import { AfterViewInit, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PhoneNumbersService } from '../services/phone-numbers.service';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-numbers-page',
  templateUrl: './numbers-page.component.html',
  styleUrls: ['./numbers-page.component.scss'],
})
export class NumbersPageComponent implements OnInit {
  constructor(private router:Router,private numbersService: PhoneNumbersService, public userServise:UserService) {}

  Data: any;
  columns: string[] = ['name', 'number', 'edits'];
  currentPage = 0;
  pageSize = 5;
  dataSource: any;
  loggedIn : any;
  hasNumbers:any;

  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  delete = (index: any) => {
    console.log(this.currentPage * this.pageSize + index, this.Data);
    let numberIndex = this.currentPage * this.pageSize + index
    this.Data.splice(numberIndex,1)
    console.log(this.Data)
    if(this.Data.length == 0) {
      this.hasNumbers = false;
    }
    this.numbersService.deleteNumber(this.Data).subscribe(item=>{
      console.log(item)
    })

    setTimeout(() => {
      this.numbersService.updateNumberList(this.Data)
    }, 500);
  }

  onPageChange = (event: any) => {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  };

  Edit = (index: any) => {
    console.log(this.currentPage * this.pageSize + index);
  };

  ngOnInit() {
    this.numbersService.getNumbers().subscribe(
      (res) => {
        this.Data = res;
        console.log(this.Data.length)
        if(this.Data.length > 0) {
        this.hasNumbers = true
        setTimeout(() => {
            this.dataSource = new MatTableDataSource(this.Data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        }, 500);

        } else {
        this.hasNumbers = false;
        }
      },
      (err) => {
        if( err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            this.router.navigate(['/login'])
          }
        }
      }
    );
    this.loggedIn = this.userServise.loggedIn()

    this.numbersService.UpdatedList.subscribe(list => {
      this.Data = list
      console.log(this.Data)
      this.dataSource = new MatTableDataSource(this.Data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      if(this.Data.length != 0) {
         this.hasNumbers = true;
      }

    })
  }
}
