import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Profile, Project, Location } from '../models/profile.model';
import { Skill } from '../models/skills.model';
import { environment } from '../../../environments/environment';

// 测试数据
const MOCK_PROFILE: Profile = {
  id: 'test-profile-id',
  walletAddress: '0x1234567890123456789012345678901234567890',
  name: '张三',
  email: 'zhangsan@example.com',
  githubUsername: 'zhangsan',
  skills: [
    { id: 'typescript', name: 'TypeScript', level: 'expert' },
    { id: 'angular', name: 'Angular', level: 'expert' },
    { id: 'nodejs', name: 'Node.js', level: 'advanced' },
    { id: 'solidity', name: 'Solidity', level: 'advanced' },
    { id: 'web3js', name: 'Web3.js', level: 'advanced' },
    { id: 'react', name: 'React', level: 'advanced' },
    { id: 'vue', name: 'Vue', level: 'intermediate' }
  ],
  experience: 5,
  projects: [
    {
      name: '区块链投票系统',
      description: '基于以太坊的智能合约投票系统，支持多轮投票和实时计票。',
      technologies: ['Solidity', 'Web3.js', 'React', 'Node.js'],
      githubUrl: 'https://github.com/zhangsan/voting-system',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-06-30')
    },
    {
      name: 'DeFi 交易平台',
      description: '去中心化金融交易平台，支持代币交换和流动性提供。',
      technologies: ['Solidity', 'Web3.js', 'Vue.js', 'TypeScript'],
      githubUrl: 'https://github.com/zhangsan/defi-platform',
      startDate: new Date('2023-07-01'),
      endDate: new Date('2023-12-31')
    }
  ],
  location: {
    latitude: 39.9042,
    longitude: 116.4074,
    address: '北京市朝阳区xxx街道',
    city: '北京',
    country: '中国'
  },
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-03-30')
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.apiUrl;
  private isDevMode = environment.production === false;

  constructor(private http: HttpClient) {}

  createProfile(profile: Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>): Observable<Profile> {
    if (this.isDevMode) {
      return of({
        ...MOCK_PROFILE,
        ...profile,
        id: `test-profile-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return this.http.post<Profile>(`${this.apiUrl}/profiles`, profile);
  }

  getProfile(id: string): Observable<Profile> {
    if (this.isDevMode) {
      return of(MOCK_PROFILE);
    }
    return this.http.get<Profile>(`${this.apiUrl}/profiles/${id}`);
  }

  updateProfile(id: string, profile: Partial<Profile>): Observable<Profile> {
    if (this.isDevMode) {
      return of({
        ...MOCK_PROFILE,
        ...profile,
        updatedAt: new Date()
      });
    }
    return this.http.patch<Profile>(`${this.apiUrl}/profiles/${id}`, profile);
  }

  addProject(profileId: string, project: Omit<Project, 'id'>): Observable<Profile> {
    if (this.isDevMode) {
      return of({
        ...MOCK_PROFILE,
        projects: [...MOCK_PROFILE.projects, project],
        updatedAt: new Date()
      });
    }
    return this.http.post<Profile>(`${this.apiUrl}/profiles/${profileId}/projects`, project);
  }

  getProfilesBySkills(skills: string[]): Observable<Profile[]> {
    if (this.isDevMode) {
      return of([MOCK_PROFILE]);
    }
    return this.http.get<Profile[]>(`${this.apiUrl}/profiles/search`, {
      params: { skills: skills.join(',') }
    });
  }
}
