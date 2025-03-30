import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DeveloperRoutingModule } from './developer-routing.module';
import { DeveloperSettingsComponent } from './developer-settings/developer-settings.component';

@NgModule({
  declarations: [
    DeveloperSettingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DeveloperRoutingModule
  ]
})
export class DeveloperModule { }
