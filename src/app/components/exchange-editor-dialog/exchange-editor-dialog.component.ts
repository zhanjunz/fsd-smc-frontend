import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExchangeModel } from './../../model/exchange-model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exchange-editor-dialog',
  templateUrl: './exchange-editor-dialog.component.html',
  styleUrls: ['./exchange-editor-dialog.component.css']
})
export class ExchangeEditorDialogComponent implements OnInit {

  newExchange: boolean = false
  editMode: boolean = false
  editorForm: FormGroup 
  loading = false
  exchangeId: number

  constructor(private fb : FormBuilder, 
              private http: HttpClient, 
              private snackbar : MatSnackBar,
              private dialogRef: MatDialogRef<ExchangeEditorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ExchangeModel) { }

  ngOnInit() {
    if(this.data == null) {
      this.newExchange = true;
      this.editMode = true;
    }

    this.editorForm = this.fb.group({
      id:[''],
      code:['', Validators.required],
      brief:['', Validators.required],
      address:['', Validators.required],
      remarks:['']
    })

    if(!this.newExchange) {
      this.exchangeId = this.data.id;
      this.editorForm.get('id').setValue(this.data.id);
      this.editorForm.get('code').setValue(this.data.code);
      this.editorForm.get('brief').setValue(this.data.brief);
      this.editorForm.get('address').setValue(this.data.address);
      this.editorForm.get('remarks').setValue(this.data.remarks);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  createNewExchange() {
    this.loading = true;
    let api = this.http.post(`${environment.gatewayUrl}/stock-market-service/stock-exchange/`, this.editorForm.value);
    api.subscribe(
      (response) => {
        this.loading=false;
        this.snackbar.open("Exchange created.", 'Close', {
          duration: 3000
        });
        this.editorForm.reset();
        this.cancel();
      },
      (error) => {
          let errorMessage: string
          this.loading = false; 
          if(error.error && error.error.message) {
            errorMessage = "Error:" + error.error.message;
          } else {
            errorMessage = "Error occured while creating new exchange."
          }
          this.snackbar.open(errorMessage, 'Close', {
            duration: 3000
          });
      }
    );
  }

  updateExchange() {
    this.loading = true;
    let api = this.http.put(`${environment.gatewayUrl}/stock-market-service/stock-exchange/`+this.exchangeId, this.editorForm.value);
    api.subscribe(
      (response) => {
        this.loading=false;
        this.snackbar.open("Exchange details updated.", 'Close', {
          duration: 3000
        });
        this.editorForm.reset();
        this.cancel();
      },
      (error) => {
          let errorMessage: string
          this.loading = false; 
          if(error.error && error.error.message) {
            errorMessage = "Error:" + error.error.message;
          } else {
            errorMessage = "Error occured while updating exchange details."
          }
          this.snackbar.open(errorMessage, 'Close', {
            duration: 3000
          });
      }
    );
  }

  performAction() {
    if(this.newExchange) {
      this.createNewExchange();
    } else if(this.editMode) {
      this.updateExchange();
    } else {
      this.editMode = true;
    }
  }

  hasError = (controlName: string, errorName: string) => {
    return this.editorForm.controls[controlName].hasError(errorName);
  }
}
