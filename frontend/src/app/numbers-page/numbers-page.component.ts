import { Component, OnInit } from '@angular/core';

import { AfterViewInit, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PhoneNumbersService } from '../services/phone-numbers.service';

@Component({
  selector: 'app-numbers-page',
  templateUrl: './numbers-page.component.html',
  styleUrls: ['./numbers-page.component.scss'],
})
export class NumbersPageComponent implements OnInit {
  constructor(private numbersService: PhoneNumbersService) {}

  Data: any;
  columns: string[] = ['name', 'number', 'edits'];
  currentPage = 0;
  pageSize = 5;
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  delete = (index: any) => {
    console.log(this.currentPage * this.pageSize + index);
  };

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
        this.dataSource = new MatTableDataSource(this.Data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
