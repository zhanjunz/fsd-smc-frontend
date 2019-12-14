import { ExchangeModel } from './exchange-model';
export interface Exchange2CompanyModel {
    companyId: number
    exchangeId: number
    exchange: ExchangeModel
    stockCode: string
}
