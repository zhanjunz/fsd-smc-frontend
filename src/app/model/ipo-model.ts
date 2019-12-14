import { ExchangeModel } from './exchange-model';
import { CompanyModel } from './company-model';
export interface IpoModel {
    id: number
    company: CompanyModel
    stockExchange: ExchangeModel
    price: Number
    totalShares: number
    openDate: Date
    remarks: string
}
