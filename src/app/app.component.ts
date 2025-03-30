import { Component } from '@angular/core';
import { DeveloperService } from './core/services/developer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <app-nav-menu></app-nav-menu>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .main-content {
      margin-left: 250px;
      padding: 2rem;
      min-height: 100vh;
      background: #f5f5f5;
    }
  `]
})
export class AppComponent {
  title = 'Nominee Match';
  useTestData$: Observable<boolean>;

  constructor(private developerService: DeveloperService) {
    this.useTestData$ = this.developerService.useTestData$;
  }

  toggleTestMode(enabled: boolean): void {
    this.developerService.toggleTestMode(enabled);
  }
}
