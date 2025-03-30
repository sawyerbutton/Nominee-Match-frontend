import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperSettingsComponent } from './developer-settings/developer-settings.component';

const routes: Routes = [
  {
    path: 'settings',
    component: DeveloperSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperRoutingModule { }
