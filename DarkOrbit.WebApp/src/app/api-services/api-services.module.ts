import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ApiServicesSidebarComponent } from './api-services-sidebar/api-services-sidebar.component';
import { ApiServicesListComponent } from './api-services-list/api-services-list.component';
import { LayoutModule } from '../layout/layout.module';

const routes: Routes = [
  {
    path: 'api-services',
    children: [
      { path: 'list', component: ApiServicesListComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule
  ],
  declarations: [ApiServicesSidebarComponent, ApiServicesListComponent]
})
export class ApiServicesModule { }
