import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TestingMainComponent } from './testing-main/testing-main.component';
import { TestingSidebarComponent } from './testing-sidebar/testing-sidebar.component';
import { LayoutModule } from '../layout/layout.module';

const routes: Routes = [
  {
    path: 'testing',
    children: [
      { path: 'main', component: TestingMainComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule
  ],
  declarations: [TestingMainComponent, TestingSidebarComponent]
})
export class TestingModule { }
