import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DeveloperService } from '../services/developer.service';

@Injectable({
  providedIn: 'root'
})
export class DeveloperSettingsGuard implements CanActivate {
  constructor(
    private developerService: DeveloperService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    try {
      const settings = await this.developerService.getDeveloperSettings();
      if (!settings) {
        this.router.navigate(['/developer/settings']);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error checking developer settings:', error);
      this.router.navigate(['/developer/settings']);
      return false;
    }
  }
}
