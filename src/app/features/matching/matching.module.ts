import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { MatchingRoutingModule } from './matching-routing.module';

@NgModule({
  declarations: [
    MatchListComponent,
    MatchDetailComponent
  ],
  imports: [
    CommonModule,
    MatchingRoutingModule
  ],
  exports: [
    MatchListComponent,
    MatchDetailComponent
  ]
})
export class MatchingModule { }
