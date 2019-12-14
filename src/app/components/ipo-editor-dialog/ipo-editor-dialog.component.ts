import { ExchangeModel } from './../../model/exchange-model';
import { switchMap, debounceTime, distinctUntilChanged, debounce, tap } from 'rxjs/operators';
import { CompanyModel } from './../../model/company-model';
import { HttpClient } from '@angular/common/http';
import { IpoModel } from './../../model/ipo-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ipo-editor-dialog',
  templateUrl: './ipo-editor-dialog.component.html',
  styleUrls: ['./ipo-editor-dialog.component.css']
})
export class IpoEditorDialogComponent implements OnInit, AfterViewInit {

  newObject: boolean = false
  editMode: boolean = false
  editorForm: FormGroup 
  loading = false
  id: number
  exchanges: ExchangeModel[]
  companies;

  updateCompanyId(company: CompanyModel) {
    this.editorForm.get('company.id').setValue(company.id);
    this.editorForm.get('company.companyName').setValue(company.companyName);
    return company.companyName;
  }

  ngAfterViewInit() {
    if(this.newObject) {
      this.getExchanges();
    }
  }

  getExchanges() {
    this.loading = true;
    let errorMessage

    let api = this.http.get(`${environment.gatewayUrl}/stock-market-service/stock-exchange/`);
    api.subscribe(
      (response: ExchangeModel[]) => {
        this.loading = false;
        if(response.length > 0) {          
          this.exchanges = response;
        }
      }, 

      (error) => {
        this.loading = false;
        if(error.error && error.error.message) {
          errorMessage = "Error:" + error.error.message;
        } else {
          errorMessage = "Error occured while calling service.";
        }
        this.snackbar.open(errorMessage, 'Close', {
          duration: 3000
        });
      }
    );
  }

  updateTextField(company:any) {
    if(company && company.id) {
      return company.companyName;
    }

    return company;
  }

  updateExchangeField(exchange:any) {
    if(exchange && exchange.id) {
      return exchange.companyName;
    }

    return exchange;
  }

  constructor(private fb : FormBuilder, 
    private http: HttpClient, 
    private snackbar : MatSnackBar,
    private dialogRef: MatDialogRef<IpoEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IpoModel) { }

  ngOnInit() {   
    if(this.data == null) {
      this.newObject = true;
      this.editMode = true;
    }

    this.editorForm = this.fb.group({
      id: [''],
      company: this.fb.group({
        id: [''],
        companyName: ['', Validators.required]
      }),
      stockExchange: this.fb.group({
        id: ['', Validators.required],
        code: ['']
      }),
      price: ['', Validators.required],
      totalShares: ['', Validators.required],
      openDate: ['', Validators.required],
      remarks: ['']
    })

    if(!this.newObject) {
      this.id = this.data.id
      this.editorForm.get('id').setValue(this.data.id)
      this.editorForm.get('company.id').setValue(this.data.company.id)
      this.editorForm.get('company.companyName').setValue(this.data.company.companyName)
      this.editorForm.get('stockExchange.id').setValue(this.data.stockExchange.id)
      this.editorForm.get('stockExchange.code').setValue(this.data.stockExchange.code)
      this.editorForm.get('price').setValue(this.data.price)
      this.editorForm.get('totalShares').setValue(this.data.totalShares)
      this.editorForm.get('openDate').setValue(this.data.openDate)
      this.editorForm.get('remarks').setValue(this.data.remarks)
    }

    //enable auto search
    this.editorForm.get('company.companyName').valueChanges.subscribe( (text) => {
      this.searchCompany(text)
    });
  }

  searching = false
  searchCompany = (query) => {
    if(!this.searching && query) {
      let txt = query
      if(query && query.id) {
        txt = query.companyName;
      }
      this.searching = true;
      this.http.get(`${environment.gatewayUrl}/stock-market-service/company/search/`+txt).subscribe(
        (response) => {
          this.companies = response;
          this.searching = false
        },
        (error) => {
          this.searching = false
        }
      );
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  validCompany: boolean = false
  validCompanyName()  {
    let companyName = this.editorForm.get('company.companyName').value
    return this.http.get(`${environment.gatewayUrl}/stock-market-service/company/name/`+companyName)
  }

  createNewObject() {
    this.loading = true;
    this.validCompanyName().subscribe(
      (response) => this.createObjectAfterValidation(),
      (error) => {
        this.snackbar.open("Please select a valid company", 'Close', {
          duration: 3000
        });
      }
    );
  }

  createObjectAfterValidation() {
    let api = this.http.post(`${environment.gatewayUrl}/stock-market-service/ipo/`, this.editorForm.value);
    api.subscribe(
      (response) => {
        this.loading=false;
        this.snackbar.open("IPO created.", 'Close', {
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
            errorMessage = "Error occured while creating new IPO."
          }
          this.snackbar.open(errorMessage, 'Close', {
            duration: 3000
          });
      }
    );
  }

  updateObject() {
    this.loading = true;
    let api = this.http.put(`${environment.gatewayUrl}/stock-market-service/ipo/`+this.id, this.editorForm.value);
    api.subscribe(
      (response) => {
        this.loading=false;
        this.snackbar.open("IPO details updated.", 'Close', {
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
            errorMessage = "Error occured while updating IPO details."
          }
          this.snackbar.open(errorMessage, 'Close', {
            duration: 3000
          });
      }
    );
  }

  performAction() {
    if(this.newObject) {
      this.createNewObject();
    } else if(this.editMode) {
      this.updateObject();
    } else {
      this.getExchanges();
      this.editMode = true;
    }
  }

  hasError = (controlName: string, errorName: string) => {
    return this.editorForm.get(controlName).hasError(errorName);
  }

}
 