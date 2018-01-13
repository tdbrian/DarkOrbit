import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ApiServicesSidebarComponent } from './api-services-sidebar/api-services-sidebar.component';
import { ApiServicesListComponent } from './api-services-list/api-services-list.component';
import { LayoutModule } from '../layout/layout.module';
import { EndpointsComponent } from './api-service/endpoints/endpoints.component';
import { SettingsComponent } from './api-service/settings/settings.component';

const routes: Routes = [
  {
    path: 'api-services',
    children: [
      { path: 'list', component: ApiServicesListComponent },
      {
        path: ':id',
        children: [
          { path: 'endpoints', component: EndpointsComponent },
          { path: 'settings', component: SettingsComponent },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule
  ],
  declarations: [ApiServicesSidebarComponent, ApiServicesListComponent, EndpointsComponent, SettingsComponent]
})
export class ApiServicesModule { }
