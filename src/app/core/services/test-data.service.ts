import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface TestUser {
  id: string;
  email: string;
  password: string;
  name: string;
  skills: string[];
  experience: string;
  interests: string;
  github?: string;
  linkedin?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestDataService {
  private testUsers: TestUser[] = [
    {
      id: '1',
      email: 'test1@example.com',
      password: 'password123',
      name: '测试用户1',
      skills: ['JavaScript', 'React', 'Node.js'],
      experience: '3',
      interests: 'Web开发,人工智能,区块链',
      github: 'https://github.com/test1',
      linkedin: 'https://linkedin.com/in/test1'
    },
    {
      id: '2',
      email: 'test2@example.com',
      password: 'password123',
      name: '测试用户2',
      skills: ['Python', '机器学习', '数据分析'],
      experience: '5',
      interests: '人工智能,数据科学,云计算',
      github: 'https://github.com/test2',
      linkedin: 'https://linkedin.com/in/test2'
    },
    {
      id: '3',
      email: 'test3@example.com',
      password: 'password123',
      name: '测试用户3',
      skills: ['Java', 'Spring Boot', '微服务'],
      experience: '4',
      interests: '后端开发,云原生,DevOps',
      github: 'https://github.com/test3',
      linkedin: 'https://linkedin.com/in/test3'
    }
  ];

  private isTestModeSubject = new BehaviorSubject<boolean>(false);
  isTestMode$ = this.isTestModeSubject.asObservable();

  constructor() {}

  getTestUsers(): TestUser[] {
    return this.testUsers;
  }

  getTestUserByEmail(email: string): TestUser | undefined {
    return this.testUsers.find(user => user.email === email);
  }

  toggleTestMode(enabled: boolean) {
    this.isTestModeSubject.next(enabled);
  }

  isTestMode(): boolean {
    return this.isTestModeSubject.value;
  }
}
