import { SectorModel } from './../../model/sector-model';
import { Exchange2CompanyModel } from './../../model/exchange2-company-model';
import { ExchangeModel } from './../../model/exchange-model';
import { HttpClient } from '@angular/common/http';
import { CompanyModel } from './../../model/company-model';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company-editor-dialog',
  templateUrl: './company-editor-dialog.component.html',
  styleUrls: ['./company-editor-dialog.component.css']
})
export class CompanyEditorDialogComponent implements OnInit {

  newObject: boolean = false
  editMode: boolean = false
  editorForm: FormGroup 
  loading = false
  id: number

  constructor(private fb : FormBuilder, 
    private http: HttpClient, 
    private snackbar : MatSnackBar,
    private dialogRef: MatDialogRef<CompanyEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompanyModel) { }

  ngOnInit() {
    if(this.data == null) {
      this.newObject = true;
      this.editMode = true;
    }

    this.editorForm = this.fb.group({
      id: [''],
      companyName: ['', Validators.required],
      ceo: ['', Validators.required],
      boardOfDirectors: ['', Validators.required],
      exchange: new FormArray([]),
      turnover: ['', [Validators.required, Validators.pattern("[0-9]*")]],
      sector: this.fb.group({
        id: ['', Validators.required],
        name:['']
      }),
      briefWriteup: ['', Validators.required]
    })
    
    this.getExchangeList().subscribe(
      response => this.initForm(response),
      error => this.handleError(error)
    )
  }

  exchanges: ExchangeModel[]
  initForm(response) {
    this.exchanges = response;
    this.loading = false;
    this.getSectors()
    if(!this.newObject) {
      this.id = this.data.id
      this.editorForm.get('id').setValue(this.data.id)
      this.editorForm.get('companyName').setValue(this.data.companyName)
      this.editorForm.get('ceo').setValue(this.data.ceo)
      this.editorForm.get('boardOfDirectors').setValue(this.data.boardOfDirectors)
      this.editorForm.get('turnover').setValue(this.data.turnover)
      this.editorForm.get('briefWriteup').setValue(this.data.briefWriteup)
      this.editorForm.get('sector').setValue(this.data.sector)
    }

    this.exchanges.forEach((o,i) => {
      let group = this.fb.group({
        companyId: [''],
        exchangeId: [this.findExchangeId(o)],
        stockCode: [this.findStockCode(o)]
      });
      (this.editorForm.get('exchange') as FormArray).push(group);
      if(this.editorForm) { group.get('companyId').setValue(this.id) }
    })
    if(!this.editMode) { this.editorForm.get('exchange').disable() }
  }

  sectors: SectorModel[]
  getSectors() {
    this.loading = true;
    let api = this.http.get(`${environment.gatewayUrl}/stock-market-service/sector/`);
    api.subscribe(
      response => {this.loading = false; this.sectors = <SectorModel[]>response;},
      error => this.handleError(error)
    )
  }

  updateCheckboxValues() {
    (this.editorForm.get('exchange') as FormArray).controls.forEach((o, i) => {
      let checkbox = (o as FormGroup).get('exchangeId')
      if(checkbox.value == true) {
        checkbox.setValue(this.exchanges[i].id)
      }
      console.log(checkbox.value)
      if(checkbox.value == false) {
        checkbox.setValue(null)
      }
    })
  }

  createNewObject() {
    this.loading = true;
    let api = this.http.post(`${environment.gatewayUrl}/stock-market-service/company/`, this.editorForm.value);
    api.subscribe(
      (response) => {
        this.loading=false;
        this.snackbar.open("Company has been created successfully.", 'Close', {
          duration: 3000
        });
        this.editorForm.reset();
        this.cancel();
      },
      (error) => this.handleError(error)
    );
  }

  updateObject() {
    this.loading = true;
    let api = this.http.put(`${environment.gatewayUrl}/stock-market-service/company/`+this.id, this.editorForm.value);
    api.subscribe(
      (response) => {
        this.loading=false;
        this.snackbar.open("Company details updated successfully.", 'Close', {
          duration: 3000
        });
        this.editorForm.reset();
        this.cancel();
      },
      (error) => this.handleError(error)
    );
  }

  performAction() {
    this.updateCheckboxValues()
    if(this.newObject) {
      this.createNewObject();
    } else if(this.editMode) {
      this.updateObject();
    } else {
      this.editorForm.get('exchange').enable()
      this.editMode = true;
    }
  }

  findExchangeId(exchange: ExchangeModel): number {
    let id = null
    if(this.data) {
      this.data.exchange.forEach((e2c, i) => {
        if(e2c.exchangeId == exchange.id) {
          id = exchange.id
        }
      })
    }
    
    return id
  }

  findStockCode(exchange: ExchangeModel): string {
    let code = null
    if(this.data) {
      this.data.exchange.forEach((e2c, i) => {
        if(e2c.exchangeId == exchange.id) {
          code = e2c.stockCode
        }
      })
    }
    
    return code
  }

  handleError(error) {
    let errorMessage: string
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

  getExchangeList() {
      this.loading = true;
      return this.http.get(`${environment.gatewayUrl}/stock-market-service/stock-exchange/`);
  }

  cancel() {
    this.dialogRef.close();
  }

  hasError = (controlName: string, errorName: string) => {
    return this.editorForm.get(controlName).hasError(errorName);
  }
}
