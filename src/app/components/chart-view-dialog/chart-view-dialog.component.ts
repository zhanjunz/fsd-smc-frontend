import { CompanyModel } from './../../model/company-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LineChartComponent } from './../charts/line-chart/line-chart.component';
import { ApiService } from './../../service/api.service';
import { ExchangeModel } from './../../model/exchange-model';
import { Component, OnInit, Inject, ViewChild, AfterViewInit, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockPrice } from 'src/app/model/stock-price';

@Component({
  selector: 'app-chart-view-dialog',
  templateUrl: './chart-view-dialog.component.html',
  styleUrls: ['./chart-view-dialog.component.css']
})
export class ChartViewDialogComponent implements OnInit, AfterViewInit {

  constructor(private apiService: ApiService,
    private fb : FormBuilder, 
    private dialogRef: MatDialogRef<ChartViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompanyModel) { }

  exchanges: ExchangeModel[]
  dataAvailable: boolean[] = [false, false]
  companyAvailable: boolean[] = [false, false]
  companyNames: string[] = ['', '']
  values: number[][] = [[], []]
  labels: string[][] = [[], []]
  
  compareViewOn: boolean = false
  compareCompanyName: string[] = ['', '']
  compareCompanyId: number
  compValues: number[][] = [[], []]
  
  startDate: Date[] = [new Date(), new Date()]
  endDate: Date[] = [new Date(), new Date()]
  selIndex = 0;
  searchedCompanies: CompanyModel[]

  editorForm: FormGroup 
  loading = false

  ngOnInit() {
    this.editorForm = this.fb.group({
        startDate: [new Date(), Validators.required],
        endDate: [new Date(), Validators.required],
        compareCompany: [],
        chartType: [1],
        merge: ['']
    })

    //enable auto search
    this.editorForm.get('compareCompany').valueChanges.subscribe( (text) => {
      this.searchCompany(text)
    });

    this.prepareChartData()
  }

  @ViewChildren(LineChartComponent) charts : QueryList<LineChartComponent>
  chartComponents: LineChartComponent[] = []
  ngAfterViewInit() {
    this.charts.changes.subscribe(() => {
      this.charts.forEach((o,i) => {
        if(this.chartComponents.indexOf(o)==-1) {
          this.chartComponents.push(o)
        }
      })
    })
  }

  prepareChartData() {
    //first get list of exchanges
    this.loading = true
    this.apiService.getStockExchangeList().subscribe(
      response => {
        this.loading = false
        this.exchanges = <ExchangeModel[]>response
        this.exchanges.forEach((exchange, i) => {
          this.prepareCompanyName(i)
          this.prepareDataForExchange(i)
        })
      },
      error => {
        this.loading = false
        this.apiService.handleError(error, "getStockExchangeList")
      }
    )
  }

  prepareCompanyName(index: number) {
    this.companyNames[index] = this.data.companyName + " (" + this.exchanges[index].code + "-"
    this.data.exchange.forEach((e2c, i) => {
      if(e2c.exchangeId == this.exchanges[index].id) {
        this.companyNames[index] += e2c.stockCode
      }
    })
    this.companyNames[index] += ")"
  }

  prepareCompareCompanyName(index: number, comp: CompanyModel) {
    this.compareCompanyName[index] = comp.companyName + " (" + this.exchanges[index].code + "-"
    comp.exchange.forEach((e2c, i) => {
      if(e2c.exchangeId == this.exchanges[index].id) {
        this.compareCompanyName[index] += e2c.stockCode
      }
    })
    this.compareCompanyName[index] += ")"
  }

  prepareDataForExchange(exchangeIndex : number) {
    //next get latest price for company
    this.loading = true
    this.apiService.getLatestPrice(this.data.id, this.exchanges[exchangeIndex].id).subscribe(
      response => {
        this.loading = false
        if(response) {          
          //extract date to prepare chart data (by default prepare chart for latest date)
          this.startDate[exchangeIndex] = new Date((<StockPrice>response).timestamp)
          this.endDate[exchangeIndex] = new Date(this.startDate[exchangeIndex])          
          this.prepareDataForDates(exchangeIndex)
          this.dataAvailable[exchangeIndex] = true
        } else {
          this.dataAvailable[exchangeIndex] = false
        }
      },
      error => {
        this.loading = false
        this.apiService.handleError(error, "getLatestPrice")
      }
    )
  }

  prepareDataForDates(exchangeIndex: number, companyId?: number, comparingCompany?: boolean) {
    if(companyId == null) {
      companyId = this.data.id
    }
    let newEndDate = new Date(this.endDate[exchangeIndex])
    newEndDate.setDate(this.endDate[exchangeIndex].getDate()+1)
    let date1str = this.startDate[exchangeIndex].getDate() + "." + (this.startDate[exchangeIndex].getMonth()+1) + "." + this.startDate[exchangeIndex].getFullYear()
    let date2str = newEndDate.getDate() + "." + (newEndDate.getMonth()+1) + "." + newEndDate.getFullYear()

    //get stock price for specific dates
    this.loading = true
    this.apiService.getPriceList(companyId, this.exchanges[exchangeIndex].id, date1str, date2str).subscribe(
      response => {
        this.loading = false
        if(response && (response as Array<StockPrice>).length>0) {          
          let newValues = (response as Array<StockPrice>).map((obj: StockPrice) => obj.price);
          let newLabels = (response as Array<StockPrice>).map((obj: StockPrice) => {
            let dt: Date = new Date(obj.timestamp)
            return dt.toLocaleDateString('en', {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true})
          });

          if(comparingCompany) {
            this.compValues[exchangeIndex] = newValues
          } else {
            this.values[exchangeIndex] = newValues
          }          
          this.labels[exchangeIndex] = newLabels

          this.sendValuesToChart(exchangeIndex, comparingCompany)
          this.companyAvailable[exchangeIndex] = true
        } else {
          this.companyAvailable[exchangeIndex] = false
        }
      },
      error => {
        this.loading = false
        this.apiService.handleError(error, "getLatestPrice")
      }
    )
  }

  sendValuesToChart(index: number, comparingCompany: boolean) {
    if(this.values.length>0 && this.chartComponents.length>index) {
      let merge = this.editorForm.get('merge').value
      this.chartComponents.forEach((o, i) => {        
        if(o.companyName == (comparingCompany && !merge ? this.compareCompanyName[index] : this.companyNames[index]) 
          && (!merge?((o.compareCompany && comparingCompany)||(!o.compareCompany && !comparingCompany)):!o.compareCompany) ) {

          if(o.chart) { o.chart.destroy() }
          this.editorForm.get('startDate').setValue(this.startDate[index])
          this.editorForm.get('endDate').setValue(this.endDate[index])
          if(merge) {
            o.values=this.values[index]
            o.values2=this.compValues[index] 
            o.companyName2=this.compareCompanyName[index]
            o.labels=this.labels[index]
            o.createMergedChart()
          } else {
            if(comparingCompany) {
              o.values=this.compValues[index]
            } else {
              o.values=this.values[index]
            }
            o.labels=this.labels[index]
            o.createChart()
          }          
        }
      })
    }
  }

  getChartId(type: string, index: number): string {
    return type+index
  }

  refresh() {    
    this.startDate[this.selIndex] = new Date(this.editorForm.get('startDate').value)
    this.endDate[this.selIndex] = new Date(this.editorForm.get('endDate').value)
    this.chartComponents.forEach((o, i) => {
      if(o.chart) { o.chart.destroy() }
    })
    this.prepareDataForDates(this.selIndex)

    this.checkForComparision()
  }

  noCompCompany() {
    return false
  }

  checkForComparision() {
    this.apiService.getCompanyByName(this.editorForm.get('compareCompany').value).subscribe(
      response => {
        let comp = <CompanyModel>response
        this.compareCompanyId = comp.id
        this.chartComponents.forEach((o, i) => {
          if(o.compareCompany) {
            let exIndex = o.exchangeIndex
            this.prepareCompareCompanyName(exIndex, comp)
            o.companyName = this.compareCompanyName[exIndex]
            this.prepareDataForDates(exIndex, comp.id, true)
          }
        })
      },
      error => this.editorForm.get('compareCompany').setValue('')
    )
  }

  searching = false
  searchCompany = (query) => {
    if(!this.searching && query) {
      let txt = query
      if(query && query.id) {
        txt = query.companyName;
      }
      this.searching = true;
      this.apiService.searchCompanies(txt).subscribe(
        (response) => {
          this.searchedCompanies = <CompanyModel[]>response;
          this.searching = false
        },
        (error) => {
          this.searching = false
        }
      );
    }
  }

  updateTextField(company:any) {
    if(company && company.id) {
      return company.companyName;
    }
    return company;
  }

  updateCompanyId(company: CompanyModel) {
    this.editorForm.get('compareCompany').setValue(company.companyName);
    return company.companyName;
  }

}
