import { Component } from '@angular/core';
import { MicroServiceEntity } from '../../api/models/micro-service-entity';
import { MicroServicesService } from '../../api/services/micro-services.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html'
})
export class NewServiceComponent {
  service = {} as MicroServiceEntity;
  isSaving = false;
  error: string;
  isJsonApi: boolean;

  constructor(
    private microService: MicroServicesService,
    private notifications: NotificationsService,
    private router: Router
  ) {}

  async createService() {
    this.isSaving = true;
    this.setServiceType();
    const newService = {...this.service};
    try {
      await this.microService.ApiMicroServicesPost(newService).toPromise();
      this.notifications.success('Created', 'Service Created');
    } catch (error) {
      this.notifications.error('Error', 'Error creating service');
    } finally {
      this.isSaving = false;
      this.router.navigateByUrl('/api-services/list');
    }
  }

  private setServiceType() {
    if (this.isJsonApi) {
      this.service.type = 'JsonApi';
    } else if (this.service.type == null || this.service.type.length === 0) {
      this.service.type = 'Standard';
    }
  }
}
