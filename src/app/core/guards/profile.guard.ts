import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { DeveloperService } from '../services/developer.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  constructor(
    private profileService: ProfileService,
    private developerService: DeveloperService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    try {
      const settings = await this.developerService.getDeveloperSettings();
      if (!settings?.walletAddress) {
        this.router.navigate(['/developer/settings']);
        return false;
      }

      const profile = await this.profileService.getProfile(settings.walletAddress).toPromise();
      if (!profile) {
        this.router.navigate(['/profile']);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error checking profile:', error);
      this.router.navigate(['/profile']);
      return false;
    }
  }
}
