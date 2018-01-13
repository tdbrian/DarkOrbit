import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BusinessDomainsSidebarComponent } from './business-domains-sidebar/business-domains-sidebar.component';
import { BusinessDomainsListComponent } from './business-domains-list/business-domains-list.component';
import { LayoutModule } from '../layout/layout.module';

const routes: Routes = [
  {
    path: 'business-domains',
    children: [
      { path: 'list', component: BusinessDomainsListComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule
  ],
  declarations: [BusinessDomainsSidebarComponent, BusinessDomainsListComponent]
})
export class BusinessDomainsModule { }
