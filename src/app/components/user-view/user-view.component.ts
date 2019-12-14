import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';  
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    /*
    let json = [{'abc':123}]
    let worksheet = XLSX.utils.json_to_sheet(json)
    let workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'ScoreSheet.xlsx');  
    */
  }

}
