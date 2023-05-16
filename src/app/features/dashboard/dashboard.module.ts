import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ListComponent } from './list/list.component';
import {MatTableModule} from '@angular/material/table';
import {HttpClientModule} from '@angular/common/http';
import { ThemeBackgroundDirective } from '../dashboard/list/list.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/dashboard.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './store/dashboard.effects';

@NgModule({
  declarations: [
    ListComponent,
    ThemeBackgroundDirective
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTableModule,
    HttpClientModule,
    StoreModule.forFeature('Dashboard',reducer),
    EffectsModule.forFeature([DashboardEffects])
  ]
})
export class DashboardModule { }
