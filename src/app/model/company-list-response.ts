import { CompanyModel } from './company-model';
export interface CompanyListResponse {
    content: CompanyModel[]
    pageable: any    
}