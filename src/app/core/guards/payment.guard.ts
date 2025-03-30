import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentGuard implements CanActivate {
  constructor(
    private paymentService: PaymentService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.paymentService.getPaymentStatus$().pipe(
      map(status => {
        if (!status || status.status !== 'confirmed') {
          this.router.navigate(['/payment']);
          return false;
        }
        return true;
      })
    );
  }
}
