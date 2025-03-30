import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestUserSwitcherComponent } from './components/test-user-switcher/test-user-switcher.component';

@NgModule({
  declarations: [
    TestUserSwitcherComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TestUserSwitcherComponent
  ]
})
export class SharedModule { }
