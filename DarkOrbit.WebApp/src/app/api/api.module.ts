import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

import { EndpointsService } from './services/endpoints.service';
import { MicroServicesService } from './services/micro-services.service';
import { ProcessesService } from './services/processes.service';
import { ResourcesService } from './services/resources.service';
import { UsersService } from './services/users.service';

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
   MicroServicesService,
   ProcessesService,
   ResourcesService,
   UsersService
  ],
})
export class ApiModule { }
