import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Web3Service } from './web3.service';

// 用于创建和更新的 DTO
export interface DeveloperSettingsDto {
  walletAddress: string;
  displayName: string;
  description?: string;
}

// 完整的开发者设置接口
export interface DeveloperSettings extends DeveloperSettingsDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// 开发模式下的默认设置
const DEFAULT_DEV_SETTINGS: DeveloperSettings = {
  id: 'test-dev-id',
  walletAddress: '0x1234567890123456789012345678901234567890',
  displayName: 'Test Developer',
  description: 'This is a test developer account',
  createdAt: new Date(),
  updatedAt: new Date()
};

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  private apiUrl = environment.apiUrl;
  private isDevMode = environment.production === false;
  private useTestDataSubject = new BehaviorSubject<boolean>(false);
  useTestData$ = this.useTestDataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private web3Service: Web3Service
  ) {
    // 从 localStorage 读取测试模式设置
    const savedTestMode = localStorage.getItem('useTestData');
    if (savedTestMode) {
      this.useTestDataSubject.next(savedTestMode === 'true');
    }
  }

  // 切换测试模式
  toggleTestMode(enabled: boolean): void {
    this.useTestDataSubject.next(enabled);
    localStorage.setItem('useTestData', enabled.toString());
  }

  // 获取当前测试模式状态
  get isTestMode(): boolean {
    return this.useTestDataSubject.value;
  }

  async getDeveloperSettings(): Promise<DeveloperSettings | null> {
    try {
      // 测试模式下返回默认设置
      if (this.isTestMode) {
        return DEFAULT_DEV_SETTINGS;
      }

      const account = await this.web3Service.getAccount();
      if (!account) {
        throw new Error('未连接钱包');
      }
      return await this.http.get<DeveloperSettings>(`${this.apiUrl}/developers/${account}`).toPromise() || null;
    } catch (error) {
      console.error('Error getting developer settings:', error);
      // 测试模式下发生错误时也返回默认设置
      return this.isTestMode ? DEFAULT_DEV_SETTINGS : null;
    }
  }

  async updateDeveloperSettings(settings: DeveloperSettingsDto): Promise<DeveloperSettings> {
    // 测试模式下直接返回合并后的设置
    if (this.isTestMode) {
      return {
        ...DEFAULT_DEV_SETTINGS,
        ...settings,
        updatedAt: new Date()
      };
    }

    const account = await this.web3Service.getAccount();
    if (!account) {
      throw new Error('未连接钱包');
    }

    // 验证钱包所有权
    const isValid = await this.verifyWalletOwnership(settings.walletAddress);
    if (!isValid) {
      throw new Error('钱包验证失败');
    }

    return await this.http.patch<DeveloperSettings>(
      `${this.apiUrl}/developers/${account}`,
      settings
    ).toPromise() || {
      ...DEFAULT_DEV_SETTINGS,
      ...settings,
      updatedAt: new Date()
    };
  }

  async verifyWalletOwnership(walletAddress: string): Promise<boolean> {
    // 测试模式下始终返回 true
    if (this.isTestMode) {
      return true;
    }

    try {
      // 生成随机消息
      const message = `Verify wallet ownership: ${Date.now()}`;

      // 使用钱包签名消息
      const signature = await this.web3Service.signMessage(message);

      // 发送到后端验证
      return await this.http.post<boolean>(`${this.apiUrl}/developers/verify-wallet`, {
        walletAddress,
        message,
        signature
      }).toPromise() || false;
    } catch (error) {
      console.error('Error verifying wallet ownership:', error);
      return false;
    }
  }

  getDeveloperProfile(walletAddress: string): Observable<DeveloperSettings> {
    // 测试模式下返回默认设置的 Observable
    if (this.isTestMode) {
      return new Observable(subscriber => {
        subscriber.next(DEFAULT_DEV_SETTINGS);
        subscriber.complete();
      });
    }
    return this.http.get<DeveloperSettings>(`${this.apiUrl}/developers/${walletAddress}`);
  }

  async getDeveloperBalance(walletAddress: string): Promise<string> {
    // 测试模式下返回测试余额
    if (this.isTestMode) {
      return '1000.00';
    }

    try {
      const balance = await this.web3Service.getBalance();
      return balance;
    } catch (error) {
      console.error('Error getting developer balance:', error);
      return '0';
    }
  }
}
