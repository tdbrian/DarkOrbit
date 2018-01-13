import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SettingsSidebarComponent } from './settings-sidebar/settings-sidebar.component';
import { SettingsMainComponent } from './settings-main/settings-main.component';
import { LayoutModule } from '../layout/layout.module';

const routes: Routes = [
  {
    path: 'settings',
    children: [
      { path: 'main', component: SettingsMainComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule
  ],
  declarations: [SettingsSidebarComponent, SettingsMainComponent]
})
export class SettingsModule { }
