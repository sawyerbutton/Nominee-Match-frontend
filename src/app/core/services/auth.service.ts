import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { TestDataService } from './test-data.service';

export interface User {
  id: string;
  email: string;
  name: string;
  skills?: string[];
  experience?: string;
  interests?: string;
  github?: string;
  linkedin?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private testDataService: TestDataService
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  async login(email: string, password: string): Promise<void> {
    if (this.testDataService.isTestMode()) {
      const testUser = this.testDataService.getTestUserByEmail(email);
      if (testUser) {
        this.currentUserSubject.next({
          id: testUser.id,
          email: testUser.email,
          name: testUser.name,
          skills: testUser.skills,
          experience: testUser.experience,
          interests: testUser.interests,
          github: testUser.github,
          linkedin: testUser.linkedin
        });
        return;
      }
    }

    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(map(response => {
        const user = response.user;
        this.currentUserSubject.next(user);
      }))
      .toPromise();
  }

  async logout(): Promise<void> {
    if (this.testDataService.isTestMode()) {
      this.currentUserSubject.next(null);
      return;
    }

    await this.http.post(`${environment.apiUrl}/auth/logout`, {}).toPromise();
    this.currentUserSubject.next(null);
  }

  async register(email: string, password: string, name: string): Promise<void> {
    if (this.testDataService.isTestMode()) {
      throw new Error('测试模式下不支持注册');
    }

    return this.http.post<any>(`${environment.apiUrl}/auth/register`, { email, password, name })
      .pipe(map(response => {
        const user = response.user;
        this.currentUserSubject.next(user);
      }))
      .toPromise();
  }

  async updateProfile(profile: Partial<User>): Promise<void> {
    if (this.testDataService.isTestMode()) {
      const currentUser = this.currentUser;
      if (currentUser) {
        this.currentUserSubject.next({
          ...currentUser,
          ...profile
        });
      }
      return;
    }

    return this.http.put<any>(`${environment.apiUrl}/auth/profile`, profile)
      .pipe(map(response => {
        const user = response.user;
        this.currentUserSubject.next(user);
      }))
      .toPromise();
  }
}
