import { Injectable } from '@angular/core';
import { MicroServiceEntity } from '../../api/models/micro-service-entity';
import { MicroServicesService } from '../../api/services/micro-services.service';

@Injectable()
export class ApiService {
  currentService: MicroServiceEntity;

  constructor(private serviceApi: MicroServicesService) {}

  async getCurrentService(id: string) {
    this.currentService = await this.serviceApi.ApiMicroServicesByIdGet(id).toPromise();
    return this.currentService;
  }
}
