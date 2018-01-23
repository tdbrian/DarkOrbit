import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SystemsManagementSidebarComponent } from './systems-management-sidebar/systems-management-sidebar.component';
import { LayoutModule } from '../layout/layout.module';
import { ServicesManagementComponent } from './services-managment/services-management.component';

const routes: Routes = [
  {
    path: 'systems-management',
    children: [
      { path: 'services', component: ServicesManagementComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule
  ],
  declarations: [SystemsManagementSidebarComponent, ServicesManagementComponent]
})
export class SystemsManagementModule { }
