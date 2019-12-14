export interface FileStatusModel {
    id: number,
    fileName: string,
    state: number,
    message: string,
    companyName: string,
    exchangeName: string,
    recordsProcessed: number,
    totalRecords: number,
    fromDate: Date,
    toDate: Date
}
