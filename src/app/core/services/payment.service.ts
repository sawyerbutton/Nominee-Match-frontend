import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Web3Service } from './web3.service';
import { environment } from '../../../environments/environment';

export interface PaymentStatus {
  status: 'pending' | 'confirmed' | 'failed';
  transactionHash?: string;
  amount?: string;
  timestamp?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly apiUrl = `${environment.apiUrl}/payments`;
  private paymentStatusSubject = new BehaviorSubject<PaymentStatus | null>(null);

  constructor(
    private http: HttpClient,
    private web3Service: Web3Service
  ) {}

  async createPayment(walletAddress: string, amount: string): Promise<any> {
    return this.http.post(this.apiUrl, {
      walletAddress,
      amount
    }).toPromise();
  }

  getPaymentStatusByAddress(walletAddress: string): Observable<PaymentStatus> {
    return this.http.get<PaymentStatus>(`${this.apiUrl}/${walletAddress}/status`);
  }

  async initiatePayment(amount: string): Promise<void> {
    try {
      // 请求用户连接钱包
      await this.web3Service.connect();
      const walletAddress = await this.web3Service.getAccount();

      if (!walletAddress) {
        throw new Error('获取钱包地址失败');
      }

      // 创建支付记录
      await this.createPayment(walletAddress, amount);

      // 开始轮询支付状态
      this.startPollingPaymentStatus(walletAddress);
    } catch (error) {
      console.error('Payment initiation failed:', error);
      throw error;
    }
  }

  private startPollingPaymentStatus(walletAddress: string): void {
    const interval = setInterval(() => {
      this.getPaymentStatusByAddress(walletAddress).subscribe({
        next: (status) => {
          this.paymentStatusSubject.next(status);
          if (status.status !== 'pending') {
            clearInterval(interval);
          }
        },
        error: (error) => {
          console.error('Error polling payment status:', error);
          clearInterval(interval);
        }
      });
    }, 5000); // 每5秒检查一次

    // 5分钟后停止轮询
    setTimeout(() => {
      clearInterval(interval);
    }, 300000);
  }

  getPaymentStatus$(): Observable<PaymentStatus | null> {
    return this.paymentStatusSubject.asObservable();
  }

  async getPaymentHistory(): Promise<any[]> {
    try {
      const account = await this.web3Service.getAccount();
      if (!account) {
        throw new Error('未连接钱包');
      }
      return await this.http.get<any[]>(`${this.apiUrl}/history/${account}`).toPromise() || [];
    } catch (error) {
      console.error('Error getting payment history:', error);
      return [];
    }
  }

  async checkTransactionStatus(txHash: string): Promise<'pending' | 'confirmed' | 'failed'> {
    try {
      const receipt = await this.web3Service.getTransactionReceipt(txHash);
      if (!receipt) {
        return 'pending';
      }
      return receipt.status === 1 ? 'confirmed' : 'failed';
    } catch (error) {
      console.error('Error checking transaction status:', error);
      return 'failed';
    }
  }
}
