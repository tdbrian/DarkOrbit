import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiModule } from '../api/api.module';

import { BusinessDomainsSidebarComponent } from './business-domains-sidebar/business-domains-sidebar.component';
import { LayoutModule } from '../layout/layout.module';
import { ProcessesComponent } from './processes/processes.component';
import { ResourcesComponent } from './resources/resources.component';
import { ProcessComponent } from './processes/process/process.component';
import { CommandsComponent } from './commands/commands.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  { path: 'business-domains', redirectTo: 'business-domains/resources', pathMatch: 'full' },
  {
    path: 'business-domains',
    children: [
      {
        path: 'resources',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: ResourcesComponent }
        ]
      },
      {
        path: 'processes',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: ProcessesComponent },
          { path: ':id', component: ProcessComponent }
        ]
      },
      {
        path: 'commands',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: CommandsComponent },
        ]
      },
      {
        path: 'events',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: EventsComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    FormsModule,
    ApiModule
  ],
  declarations: [
    BusinessDomainsSidebarComponent,
    ProcessesComponent,
    ProcessComponent,
    ResourcesComponent,
    CommandsComponent,
    EventsComponent
  ]
})
export class BusinessDomainsModule { }
