import { FileStatusModel } from './file-status-model';
import { FileStatusResponse } from './file-status-response';
export interface FileStatusResponse {
    content: FileStatusModel[]
    pageable: any
}
