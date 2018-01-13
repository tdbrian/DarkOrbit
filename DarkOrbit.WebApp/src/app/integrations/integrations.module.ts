import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IntegrationsSidebarComponent } from './integrations-sidebar/integrations-sidebar.component';
import { IntegrationsListComponent } from './integrations-list/integrations-list.component';
import { LayoutModule } from '../layout/layout.module';

const routes: Routes = [
  {
    path: 'integrations',
    children: [
      { path: 'list', component: IntegrationsListComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule
  ],
  declarations: [IntegrationsSidebarComponent, IntegrationsListComponent]
})
export class IntegrationsModule { }
