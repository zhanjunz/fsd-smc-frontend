import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private httpClient: HttpClient, private snackbar : MatSnackBar) { }

  getStockExchangeList(): Observable<Object> {
    return this.httpClient.get(`${environment.gatewayUrl}/stock-market-service/stock-exchange/`)
  }

  getLatestPrice(companyId: number, exchangeId: number): Observable<Object> {
    return this.httpClient.get(`${environment.gatewayUrl}/stock-market-service/price/getLastPrice/` + companyId + `/` + exchangeId)
  }

  getPriceList(companyId: number, exchangeId: number, startDate: string, endDate: string): Observable<Object> {
    return this.httpClient.get(`${environment.gatewayUrl}/stock-market-service/price/for-company-date-range/${companyId}/${exchangeId}/${startDate}/${endDate}`);
  }

  searchCompanies(searchText: string) {
    return this.httpClient.get(`${environment.gatewayUrl}/stock-market-service/company/search/${searchText}`)
  }

  getCompanyByName(companyName: string) {
    return this.httpClient.get(`${environment.gatewayUrl}/stock-market-service/company/name/${companyName}`)
  }
  
  handleError(error, serviceName: string) {
    let errorMessage: string
    if(error.error && error.error.message) {
      errorMessage = "Error:" + error.error.message;
    } else {
      errorMessage = "Error occured while calling service: " + serviceName;
    }
    this.snackbar.open(errorMessage, 'Close', {
      duration: 3000
    });
  }
}
