import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperSettingsGuard } from './core/guards/developer-settings.guard';
import { ProfileGuard } from './core/guards/profile.guard';
import { PaymentGuard } from './core/guards/payment.guard';

const routes: Routes = [
  {
    path: 'developer',
    loadChildren: () => import('./features/developer/developer.module').then(m => m.DeveloperModule)
  },
  {
    path: '',
    redirectTo: 'developer/settings',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [DeveloperSettingsGuard]
  },
  {
    path: 'matching',
    loadChildren: () => import('./features/matching/matching.module').then(m => m.MatchingModule),
    canActivate: [DeveloperSettingsGuard, ProfileGuard, PaymentGuard]
  },
  {
    path: 'payment',
    loadChildren: () => import('./features/payment/payment.module').then(m => m.PaymentModule),
    canActivate: [DeveloperSettingsGuard, ProfileGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
