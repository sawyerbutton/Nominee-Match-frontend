import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService, PaymentStatus } from '@core/services/payment.service';
import { Web3Service } from '@core/services/web3.service';
import { ethers } from 'ethers';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  paymentForm: FormGroup;
  balance: string = '0';
  paymentStatus: PaymentStatus | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private web3Service: Web3Service
  ) {
    this.paymentForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  async ngOnInit() {
    try {
      await this.web3Service.connect();
      const balance = await this.web3Service.getBalance();
      this.balance = ethers.formatEther(balance);
    } catch (error) {
      console.error('Failed to load balance:', error);
      this.error = '加载余额失败';
    }

    this.paymentService.getPaymentStatus$().subscribe((status: PaymentStatus | null) => {
      this.paymentStatus = status;
      if (status?.status === 'confirmed') {
        this.isLoading = false;
        this.error = null;
      } else if (status?.status === 'failed') {
        this.isLoading = false;
        this.error = '支付失败';
      }
    });
  }

  async onSubmit() {
    if (this.paymentForm.valid) {
      this.isLoading = true;
      this.error = null;

      try {
        await this.paymentService.initiatePayment(this.paymentForm.value.amount);
      } catch (error) {
        console.error('Payment failed:', error);
        this.error = '支付失败';
        this.isLoading = false;
      }
    }
  }
}
