import { CompareCompanyDialogComponent } from './../compare-company-dialog/compare-company-dialog.component';
import { ChartViewDialogComponent } from './../chart-view-dialog/chart-view-dialog.component';
import { CompanyViewDialogComponent } from './../company-view-dialog/company-view-dialog.component';
import { CompanyListResponse } from './../../model/company-list-response';
import { CompanyEditorDialogComponent } from './../company-editor-dialog/company-editor-dialog.component';
import { HttpClient } from '@angular/common/http';
import { CompanyModel } from './../../model/company-model';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.css']
})
export class ManageCompanyComponent implements OnInit, AfterViewInit {

  @Input('adminView')
  isAdmin: boolean

  displayedColumns: string[] = ['companyName', 'exchange', 'sector', 'details']
  datasource = new MatTableDataSource<CompanyModel>()
  data:CompanyModel[]
  pageSize = 10
  currentPage = 0
  moreData = true
  
  constructor(private dialog: MatDialog, private httpClient: HttpClient, private snackbar : MatSnackBar) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.refresh();
  }

  refresh() {
    if(!this.loading) {
      this.currentPage=0;
      this.datasource.data.splice(0, this.datasource.data.length);
      this.getMore();
    }
  }

  getMore() {
    this.getData(this.currentPage++, this.pageSize);
  }

  error: boolean;
  loading: boolean = false;
  errorMessage: string;
  getData(page: number, size: number) {
    this.loading = true;
    this.error = false;

    let api = this.httpClient.get(`${environment.gatewayUrl}/stock-market-service/company/`+page+`/`+size);
    api.subscribe(
      (response: CompanyListResponse) => {
        this.loading = false;
        let newData = response.content;
        if(newData.length == 0) {
          this.moreData = false;
        } else {
          if(newData.length < this.pageSize) {
            this.moreData = false;
          } else {
            this.moreData = true;
          }

          if(this.data != null) {
            this.data.push(...newData);
            this.datasource.data = this.data;
          } else {
            this.data = newData;
            this.datasource = new MatTableDataSource<CompanyModel>(this.data);
          }
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

  detailsOf(row: CompanyModel) {
    let ref = this.dialog.open(CompanyEditorDialogComponent, {width:'500px', data:row});
    ref.afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  userViewDetailsOf(row: CompanyModel) {
    this.dialog.open(CompanyViewDialogComponent, {width:'500px', data:row});
  }

  compareThis(row: CompanyModel) {
    this.dialog.open(CompareCompanyDialogComponent, {width:'80%', height:'80%', data:row});
  }

  viewChart(row: CompanyModel) {
    this.dialog.open(ChartViewDialogComponent, {width:'80%', height:'80%', data:row});
  }

  getExchangeList(company: CompanyModel): string {
    let exchangeList: string
    company.exchange.forEach((exchange) => {
      if(exchangeList == null) {
        exchangeList = exchange.exchange.code;
      } else {
        exchangeList = exchangeList.concat(",", exchange.exchange.code);
      }
    });

    return exchangeList;
  }

}
