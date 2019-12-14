import { ExchangeEditorDialogComponent } from './../exchange-editor-dialog/exchange-editor-dialog.component';
import { FileStatusResponse } from './../../model/file-status-response';
import { MatTableDataSource } from '@angular/material/table';
import { ExchangeModel } from './../../model/exchange-model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-exchange',
  templateUrl: './manage-exchange.component.html',
  styleUrls: ['./manage-exchange.component.css']
})
export class ManageExchangeComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['code', 'brief', 'details'];
  datasource = new MatTableDataSource<ExchangeModel>();
  
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

    let api = this.httpClient.get(`${environment.gatewayUrl}/stock-market-service/stock-exchange/`);
    api.subscribe(
      (response: ExchangeModel[]) => {
        this.loading = false;
        if(response.length > 0) {          
          this.datasource = new MatTableDataSource<ExchangeModel>(response);
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

  detailsOf(row: ExchangeModel) {
    let ref = this.dialog.open(ExchangeEditorDialogComponent, {width:'500px', data:row});
    ref.afterClosed().subscribe(() => {
      this.refresh();
    });
  }

}
