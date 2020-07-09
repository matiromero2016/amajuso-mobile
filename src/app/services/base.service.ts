import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export abstract class BaseService {
    protected extractData(response: any) {
        console.log('response:', response);
        console.log('responseData:', response.data);
        return response.data || {};
    }
    protected serviceError(response : Response | any) {
        console.log('responseError:', response);
        let customerError : string [] = [];

        if (response instanceof HttpErrorResponse) {
            if (response.statusText === "Unknown Error") {
                customerError.push("Ocurrió un error desconocido..");
                response.error.errors = customerError;
            }
        }
        return throwError(response);
    }
}