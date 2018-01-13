import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { UserIdentitiesSidebarComponent } from './user-identities-sidebar/user-identities-sidebar.component';
import { UserIdentitiesMainComponent } from './user-identities-main/user-identities-main.component';
import { LayoutModule } from '../layout/layout.module';

const routes: Routes = [
  {
    path: 'user-identities',
    children: [
      { path: 'main', component: UserIdentitiesMainComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule
  ],
  declarations: [UserIdentitiesSidebarComponent, UserIdentitiesMainComponent]
})
export class UserIdentitiesModule { }
