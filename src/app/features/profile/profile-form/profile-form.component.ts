import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../core/services/profile.service';
import { Web3Service } from '../../../core/services/web3.service';
import { LocationService } from '../../../core/services/location.service';
import { SKILL_CATEGORIES, Skill } from '../../../core/models/skills.model';
import { Location } from '../../../core/models/profile.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {
  profileForm: FormGroup;
  skillCategories = SKILL_CATEGORIES;
  selectedSkills: Map<string, Skill> = new Map();
  location: Location | null = null;
  locationError: string | null = null;
  isGettingLocation = false;
  private isDevMode = environment.production === false;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private web3Service: Web3Service,
    private locationService: LocationService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      githubUsername: ['', Validators.required],
      experience: [0, [Validators.required, Validators.min(0)]],
      skills: [[]],
      projects: [[]],
      location: [null]
    });
  }

  async ngOnInit(): Promise<void> {
    // 在开发模式下，自动加载测试数据
    if (this.isDevMode) {
      const mockProfile = await this.profileService.getProfile('test-profile-id').toPromise();
      if (mockProfile) {
        this.loadProfileData(mockProfile);
      }
    } else {
      // 生产模式下，从钱包地址加载数据
      this.web3Service.account$.subscribe(account => {
        if (account) {
          this.profileService.getProfile(account).subscribe(profile => {
            if (profile) {
              this.loadProfileData(profile);
            }
          });
        }
      });
    }
  }

  private loadProfileData(profile: any): void {
    // 更新表单数据
    this.profileForm.patchValue({
      name: profile.name,
      email: profile.email,
      githubUsername: profile.githubUsername,
      experience: profile.experience,
      projects: profile.projects,
      location: profile.location
    });

    // 更新选中的技能
    profile.skills.forEach((skill: Skill) => {
      this.selectedSkills.set(skill.id, skill);
    });
    this.updateFormSkills();

    // 更新位置信息
    if (profile.location) {
      this.location = profile.location;
    }
  }

  getCurrentLocation(): void {
    this.isGettingLocation = true;
    this.locationError = null;
    this.locationService.getCurrentLocation().subscribe({
      next: (location) => {
        this.location = location;
        this.profileForm.patchValue({ location });
        this.isGettingLocation = false;
      },
      error: (error) => {
        this.locationError = '无法获取位置信息';
        this.isGettingLocation = false;
      }
    });
  }

  toggleSkill(skill: Skill): void {
    if (this.selectedSkills.has(skill.id)) {
      this.selectedSkills.delete(skill.id);
    } else {
      this.selectedSkills.set(skill.id, skill);
    }
    this.updateFormSkills();
  }

  isSkillSelected(skillId: string): boolean {
    return this.selectedSkills.has(skillId);
  }

  private updateFormSkills(): void {
    this.profileForm.patchValue({
      skills: Array.from(this.selectedSkills.values())
    });
  }

  async onSubmit(): Promise<void> {
    if (this.profileForm.valid) {
      try {
        const account = await this.web3Service.getAccount();
        if (!account) {
          throw new Error('未连接钱包');
        }

        const profileData = this.profileForm.value;
        await this.profileService.updateProfile(account, profileData).toPromise();
        // 处理成功提交
      } catch (error) {
        console.error('Error submitting profile:', error);
        // 处理错误
      }
    }
  }
}
