import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BusinessDomainsSidebarComponent } from './business-domains-sidebar/business-domains-sidebar.component';
import { LayoutModule } from '../layout/layout.module';
import { ProcessesComponent } from './processes/processes.component';
import { ResourcesComponent } from './resources/resources.component';
import { ProcessComponent } from './processes/process/process.component';

const routes: Routes = [
  { path: 'business-domains', redirectTo: 'business-domains/resources', pathMatch: 'full' },
  {
    path: 'business-domains',
    children: [
      {
        path: 'resources',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: ProcessesComponent }
        ]
      },
      {
        path: 'processes',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: ProcessesComponent },
          { path: ':id', component: ProcessComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule
  ],
  declarations: [
    BusinessDomainsSidebarComponent,
    ProcessesComponent,
    ProcessComponent,
    ResourcesComponent
  ]
})
export class BusinessDomainsModule { }
