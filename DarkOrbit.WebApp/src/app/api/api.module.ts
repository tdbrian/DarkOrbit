import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

import { EndpointsService } from './services/endpoints.service';
import { MicroServicesService } from './services/micro-services.service';

/**
 * Module that provides instances for all API services
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
   EndpointsService,
   MicroServicesService
  ],
})
export class ApiModule { }
