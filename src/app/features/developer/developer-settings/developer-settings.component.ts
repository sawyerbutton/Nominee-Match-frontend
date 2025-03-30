import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Web3Service } from '../../../core/services/web3.service';
import { DeveloperService } from '../../../core/services/developer.service';

@Component({
  selector: 'app-developer-settings',
  templateUrl: './developer-settings.component.html',
  styleUrls: ['./developer-settings.component.css']
})
export class DeveloperSettingsComponent implements OnInit {
  settingsForm: FormGroup;
  currentWallet: string | null = null;
  isConnecting = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private fb: FormBuilder,
    private web3Service: Web3Service,
    private developerService: DeveloperService,
    private router: Router
  ) {
    this.settingsForm = this.fb.group({
      walletAddress: ['', [Validators.required, Validators.pattern(/^0x[a-fA-F0-9]{40}$/)]],
      displayName: ['', Validators.required],
      description: ['']
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      // 获取当前绑定的钱包地址
      const settings = await this.developerService.getDeveloperSettings();
      if (settings?.walletAddress) {
        this.currentWallet = settings.walletAddress;
        this.settingsForm.patchValue({
          walletAddress: settings.walletAddress,
          displayName: settings.displayName,
          description: settings.description
        });
      }
    } catch (error) {
      console.error('Error loading developer settings:', error);
      this.error = '加载设置失败';
    }
  }

  async connectWallet(): Promise<void> {
    this.isConnecting = true;
    this.error = null;
    try {
      await this.web3Service.connectWallet();
      const account = await this.web3Service.getAccount();
      if (account) {
        this.currentWallet = account;
        this.settingsForm.patchValue({ walletAddress: account });
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      this.error = '连接钱包失败';
    } finally {
      this.isConnecting = false;
    }
  }

  async saveSettings(): Promise<void> {
    if (this.settingsForm.valid) {
      try {
        const formData = this.settingsForm.value;
        await this.developerService.updateDeveloperSettings(formData);
        this.success = '设置保存成功';
        // 保存成功后自动导航到个人资料页面
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 1500);
      } catch (error) {
        console.error('Error saving settings:', error);
        this.error = '保存设置失败';
      }
    } else {
      this.error = '请填写所有必填字段';
    }
  }

  async verifyWallet(): Promise<void> {
    if (!this.currentWallet) {
      this.error = '请先连接钱包';
      return;
    }

    try {
      const isValid = await this.developerService.verifyWalletOwnership(this.currentWallet);
      if (isValid) {
        this.success = '钱包验证成功';
      } else {
        this.error = '钱包验证失败';
      }
    } catch (error) {
      console.error('Error verifying wallet:', error);
      this.error = '验证钱包失败';
    }
  }
}
