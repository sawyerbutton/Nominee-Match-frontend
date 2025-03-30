import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { TestDataService, TestUser } from '@core/services/test-data.service';

@Component({
  selector: 'app-test-user-switcher',
  templateUrl: './test-user-switcher.component.html',
  styleUrls: ['./test-user-switcher.component.css']
})
export class TestUserSwitcherComponent implements OnInit {
  isTestMode = false;
  currentUser: string | null = null;
  testUsers: TestUser[] = [];

  constructor(
    private authService: AuthService,
    private testDataService: TestDataService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser()?.email || null;
    this.testUsers = this.testDataService.getTestUsers();

    // 订阅测试模式状态
    this.testDataService.isTestMode$.subscribe(enabled => {
      this.isTestMode = enabled;
    });
  }

  toggleTestMode() {
    this.isTestMode = !this.isTestMode;
    this.testDataService.toggleTestMode(this.isTestMode);
  }

  async switchUser(user: TestUser) {
    try {
      // 在测试模式下，直接使用测试用户数据
      if (this.testDataService.isTestMode()) {
        this.currentUser = user.email;
        // 存储测试用户数据到 localStorage
        localStorage.setItem('testUser', JSON.stringify(user));
        window.location.reload();
      } else {
        await this.authService.login(user.email, user.password);
        this.currentUser = user.email;
        window.location.reload();
      }
    } catch (error) {
      console.error('切换用户失败:', error);
    }
  }

  async logout() {
    try {
      if (this.testDataService.isTestMode()) {
        localStorage.removeItem('testUser');
      } else {
        await this.authService.logout();
      }
      this.currentUser = null;
      this.isTestMode = false;
      this.testDataService.toggleTestMode(false);
      window.location.reload();
    } catch (error) {
      console.error('登出失败:', error);
    }
  }
}
