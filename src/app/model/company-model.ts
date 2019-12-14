import { Exchange2CompanyModel } from './exchange2-company-model';
import { SectorModel } from './sector-model';
import { ExchangeModel } from './exchange-model';
export interface CompanyModel {
    id: number
    companyName: string
    ceo: string
    boardOfDirectors: string
    exchange: Exchange2CompanyModel[]
    turnover: number
    sector: SectorModel
    briefWriteup: string
}
