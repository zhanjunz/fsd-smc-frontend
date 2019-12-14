import { IpoViewDialogComponent } from './../ipo-view-dialog/ipo-view-dialog.component';
import { CompanyModel } from './../../model/company-model';
import { IpoEditorDialogComponent } from './../ipo-editor-dialog/ipo-editor-dialog.component';
import { HttpClient } from '@angular/common/http';
import { IpoModel } from './../../model/ipo-model';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-ipo',
  templateUrl: './manage-ipo.component.html',
  styleUrls: ['./manage-ipo.component.css']
})
export class ManageIpoComponent implements OnInit, AfterViewInit {

  @Input('adminView')
  isAdmin: boolean

  displayedColumns: string[] = ['companyName', 'exchange', 'price', 'shares', 'openDate', 'details'];
  datasource = new MatTableDataSource<IpoModel>();
  
  constructor(private dialog: MatDialog, private httpClient: HttpClient, private snackbar : MatSnackBar) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.refresh();
  }

  refresh() {
    if(!this.loading) {
      this.getData();
    }
  }

  error: boolean;
  loading: boolean = false;
  errorMessage: string;
  getData() {
    this.loading = true;
    this.error = false;

    let api = this.httpClient.get(`${environment.gatewayUrl}/stock-market-service/ipo/`);
    api.subscribe(
      (response: IpoModel[]) => {
        this.loading = false;
        if(response.length > 0) {          
          this.datasource = new MatTableDataSource<IpoModel>(response);
        }
      }, 

      (error) => {
        this.loading = false;
        this.error = true;
        if(error.error && error.error.message) {
          this.errorMessage = "Error:" + error.error.message;
        } else {
          this.errorMessage = "Error occured while calling service.";
        }
        this.snackbar.open(this.errorMessage, 'Close', {
          duration: 3000
        });
      }
    );
  }

  userViewDetailsOf(row: IpoModel) {
    this.dialog.open(IpoViewDialogComponent, {width:'500px', data:row});
  }

  detailsOf(row: IpoModel) {
    let ref = this.dialog.open(IpoEditorDialogComponent, {width:'500px', data:row});
    ref.afterClosed().subscribe(() => {
      this.refresh();
    });
  }

}
