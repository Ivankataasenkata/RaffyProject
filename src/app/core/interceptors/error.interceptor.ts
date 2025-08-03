import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { ErrorService } from "../services/error.service";
import { catchError, throwError } from "rxjs";


export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {

    const errorService = inject(ErrorService);

    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            let errorMsg = '';

            if(typeof ErrorEvent !== 'undefined' && err.error instanceof ErrorEvent){
                errorMsg = err.error.message;
            }else {
                errorMsg = err.error?.message || err.message;
            }

            errorService.setError(errorMsg);
            return throwError(() => err);
        })
    );
}