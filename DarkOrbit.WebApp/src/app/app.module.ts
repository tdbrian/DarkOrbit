import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ApiServicesModule } from './api-services/api-services.module';
import { DashboardsModule } from './dashboards/dashboards.module';
import { LayoutModule } from './layout/layout.module';
import { BrowserAppsModule } from './browser-apps/browser-apps.module';
import { BusinessAnalyticsModule } from './business-analytics/business-analytics.module';
import { BusinessDomainsModule } from './business-domains/business-domains.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { SecurityModule } from './security/security.module';
import { SettingsModule } from './settings/settings.module';
import { SystemsManagementModule } from './systems-management/systems-management.module';
import { TestingModule } from './testing/testing.module';
import { UserIdentitiesModule } from './user-identities/user-identities.module';

const routes: Routes = [
  { path: '', redirectTo: '/dashboards/main', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    LayoutModule,
    DashboardsModule,
    ApiServicesModule,
    BrowserAppsModule,
    BusinessAnalyticsModule,
    BusinessDomainsModule,
    IntegrationsModule,
    SecurityModule,
    SettingsModule,
    SystemsManagementModule,
    TestingModule,
    UserIdentitiesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
