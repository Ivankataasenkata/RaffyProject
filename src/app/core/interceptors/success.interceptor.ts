import { HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { SuccessService } from '../services/success.service';


export const SuccessInterceptor: HttpInterceptorFn = (req, next) => {
  const successService = inject(SuccessService);

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse && event.status >= 200 && event.status < 300) {
        // You can customize the success message or use event.body
        const successMsg = (event.body as any)?.message || 'Operation successful';
        successService.setSuccess(successMsg);
      }
    })
  );
};
