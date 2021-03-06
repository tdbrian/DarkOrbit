import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

import { CommandsService } from './services/commands.service';
import { EndpointsService } from './services/endpoints.service';
import { EventsService } from './services/events.service';
import { MicroServicesService } from './services/micro-services.service';
import { ProcessesService } from './services/processes.service';
import { ResourcesService } from './services/resources.service';
import { ServiceManagerService } from './services/service-manager.service';
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
   CommandsService,
   EndpointsService,
   EventsService,
   MicroServicesService,
   ProcessesService,
   ResourcesService,
   ServiceManagerService,
   UsersService
  ],
})
export class ApiModule { }
