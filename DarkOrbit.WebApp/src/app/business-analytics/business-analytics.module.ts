import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BusinessAnalyticsSidebarComponent } from './business-analytics-sidebar/business-analytics-sidebar.component';
import { BusinessAnalyticsMainComponent } from './business-analytics-main/business-analytics-main.component';
import { LayoutModule } from '../layout/layout.module';

const routes: Routes = [
  {
    path: 'business-analytics',
    children: [
      { path: 'main', component: BusinessAnalyticsMainComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule
  ],
  declarations: [BusinessAnalyticsSidebarComponent, BusinessAnalyticsMainComponent]
})
export class BusinessAnalyticsModule { }
