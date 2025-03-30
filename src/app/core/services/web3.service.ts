import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

declare global {
  interface Window {
    ethereum?: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private accountSubject = new BehaviorSubject<string | null>(null);

  constructor() {
    if (typeof window !== 'undefined' && window.ethereum) {
      this.provider = new ethers.BrowserProvider(window.ethereum);
    }
  }

  get account$() {
    return this.accountSubject.asObservable();
  }

  async connect(): Promise<void> {
    if (!this.provider) {
      throw new Error('未检测到 MetaMask');
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      this.signer = await this.provider.getSigner();
      const address = await this.signer.getAddress();
      this.accountSubject.next(address);
    } catch (error) {
      console.error('连接钱包失败:', error);
      throw error;
    }
  }

  async connectWallet(): Promise<void> {
    return this.connect();
  }

  async getAccount(): Promise<string | null> {
    if (!this.signer) {
      return null;
    }

    try {
      const address = await this.signer.getAddress();
      this.accountSubject.next(address);
      return address;
    } catch (error) {
      console.error('获取账户失败:', error);
      return null;
    }
  }

  async getBalance(): Promise<string> {
    if (!this.signer) {
      throw new Error('未连接钱包');
    }

    try {
      const address = await this.signer.getAddress();
      const balance = await this.provider!.getBalance(address);
      return balance.toString();
    } catch (error) {
      console.error('获取余额失败:', error);
      throw error;
    }
  }

  async sendTransaction(to: string, value: string): Promise<ethers.TransactionResponse> {
    if (!this.signer) {
      throw new Error('未连接钱包');
    }

    try {
      const tx = {
        to,
        value: ethers.parseEther(value)
      };

      return await this.signer.sendTransaction(tx);
    } catch (error) {
      console.error('发送交易失败:', error);
      throw error;
    }
  }

  async sendPayment(to: string, amount: string): Promise<ethers.TransactionResponse> {
    if (!this.signer) {
      throw new Error('未连接钱包');
    }

    try {
      const tx = {
        to,
        value: ethers.parseEther(amount)
      };

      return await this.signer.sendTransaction(tx);
    } catch (error) {
      console.error('发送支付失败:', error);
      throw error;
    }
  }

  async signMessage(message: string): Promise<string> {
    if (!this.signer) {
      throw new Error('未连接钱包');
    }

    try {
      return await this.signer.signMessage(message);
    } catch (error) {
      console.error('签名失败:', error);
      throw error;
    }
  }

  async getTransactionReceipt(txHash: string): Promise<ethers.TransactionReceipt | null> {
    if (!this.provider) {
      throw new Error('未检测到 MetaMask');
    }

    try {
      return await this.provider.getTransactionReceipt(txHash);
    } catch (error) {
      console.error('获取交易收据失败:', error);
      return null;
    }
  }
}
