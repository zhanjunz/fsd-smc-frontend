import { CompanyModel } from './../../model/company-model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-company-view-dialog',
  templateUrl: './company-view-dialog.component.html',
  styleUrls: ['./company-view-dialog.component.css']
})
export class CompanyViewDialogComponent implements OnInit {

  constructor( 
    private dialogRef: MatDialogRef<CompanyViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompanyModel) { }

  ngOnInit() {
  }

}
