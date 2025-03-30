import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentService } from '@core/services/payment.service';
import { Web3Service } from '@core/services/web3.service';

@NgModule({
  declarations: [
    PaymentFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaymentRoutingModule
  ],
  providers: [
    PaymentService,
    Web3Service
  ],
  exports: [
    PaymentFormComponent
  ]
})
export class PaymentModule { }
