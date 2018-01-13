import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BrowserAppsSidebarComponent } from './browser-apps-sidebar/browser-apps-sidebar.component';
import { BrowserAppsListComponent } from './browser-apps-list/browser-apps-list.component';
import { LayoutModule } from '../layout/layout.module';

const routes: Routes = [
  {
    path: 'browser-apps',
    children: [
      { path: 'list', component: BrowserAppsListComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule
  ],
  declarations: [BrowserAppsSidebarComponent, BrowserAppsListComponent]
})
export class BrowserAppsModule { }
