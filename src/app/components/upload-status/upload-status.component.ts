import { FileStatusResponse } from './../../model/file-status-response';
import { UploadStatusDialogComponent } from '../upload-status-dialog/upload-status-dialog.component';
import { FileStatusModel } from './../../model/file-status-model';
import { Component, OnInit, AfterViewInit, getModuleFactory } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-status',
  templateUrl: './upload-status.component.html',
  styleUrls: ['./upload-status.component.css']
})
export class UploadStatusComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['fileName', 'status', 'details'];
  data: FileStatusModel[];
  files = new MatTableDataSource<FileStatusModel>();
  pageSize = 10;
  currentPage = 0;
  moreData = true;

  constructor(private dialog: MatDialog, private httpClient: HttpClient, private snackbar : MatSnackBar) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.refresh();
  }

  detailsOf(row) {
    this.dialog.open(UploadStatusDialogComponent, {width:'450px', data:row});
  }

  refresh() {
    if(!this.loading) {
      this.currentPage=0;
      this.files.data.splice(0, this.files.data.length);
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

    let api = this.httpClient.get(`${environment.gatewayUrl}/stock-market-service/upload-status/`+page+`/`+size);
    api.subscribe(
      (response: FileStatusResponse) => {
        let newData = response.content;
        this.loading = false;
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
            this.files.data = this.data;
          } else {
            this.data = newData;
            this.files = new MatTableDataSource<FileStatusModel>(this.data);
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
}
