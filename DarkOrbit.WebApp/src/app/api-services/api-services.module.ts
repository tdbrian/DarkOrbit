import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api-service/api.service';

import { ApiServicesSidebarComponent } from './api-services-sidebar/api-services-sidebar.component';
import { ApiServicesListComponent } from './api-services-list/api-services-list.component';
import { LayoutModule } from '../layout/layout.module';
import { EndpointsComponent } from './api-service/endpoints/endpoints.component';
import { SettingsComponent } from './api-service/settings/settings.component';
import { ApiServiceSidebarComponent } from './api-service/api-service-sidebar/api-service-sidebar.component';
import { NewServiceComponent } from './new-service/new-service.component';
import { ApiModule } from '../api/api.module';

const routes: Routes = [
  { path: 'api-services', redirectTo: 'api-services/list', pathMatch: 'full' },
  // { path: 'api-services/:id', redirectTo: 'api-services/:id/endpoints', pathMatch: 'full' },
  {
    path: 'api-services',
    children: [
      { path: 'list', component: ApiServicesListComponent },
      { path: 'new', component: NewServiceComponent },
      {
        path: ':id',
        children: [
          { path: '', redirectTo: 'endpoints', pathMatch: 'full' },
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
    ApiModule,
    LayoutModule,
    FormsModule
  ],
  providers: [
    ApiService
  ],
  declarations: [
    ApiServicesSidebarComponent,
    ApiServicesListComponent,
    EndpointsComponent,
    SettingsComponent,
    ApiServiceSidebarComponent,
    NewServiceComponent
  ]
})
export class ApiServicesModule { }
