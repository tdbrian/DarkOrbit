import { Component, OnInit } from '@angular/core';
import { MicroServicesService } from '../../api/services';
import { MicroServiceEntity } from '../../api/models/micro-service-entity';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-api-services-list',
  templateUrl: './api-services-list.component.html'
})
export class ApiServicesListComponent implements OnInit {
  services: MicroServiceEntity[] = [];
  isLoading = true;
  error: string;
  firstView = true;

  constructor(
    private microServicesService: MicroServicesService,
    private notifications: NotificationsService
  ) {}

  async ngOnInit() {
    try {
      this.services = await this.microServicesService.ApiMicroServicesGet().toPromise();
      if (this.services.length) { this.firstView = false; }
    } catch (error) {
      this.notifications.error('Error', 'Loading services');
    } finally {
      this.isLoading = false;
    }
  }

  getOpenLink = (id: string) => `../${id}`;
}
