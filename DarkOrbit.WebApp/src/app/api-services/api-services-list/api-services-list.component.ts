import { Component, OnInit } from '@angular/core';
import { MicroServicesService } from '../../api/services';
import { MicroServiceEntity } from '../../api/models/micro-service-entity';

@Component({
  selector: 'app-api-services-list',
  templateUrl: './api-services-list.component.html'
})
export class ApiServicesListComponent implements OnInit {
  services: MicroServiceEntity[] = [];
  isLoading: boolean;
  error: string;

  constructor(private microServicesService: MicroServicesService) { }

  async ngOnInit() {
    this.isLoading = true;
    this.services = await this.microServicesService.ApiMicroServicesGet().toPromise()
      .catch((err) => this.error = err);
    this.isLoading = false;
  }

  getOpenLink = (id: string) => `../${id}`;
  showServices = () => !this.isLoading && this.services != null && this.services.length > 0;
}
