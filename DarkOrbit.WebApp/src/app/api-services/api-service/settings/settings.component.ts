import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NotificationsService } from 'angular2-notifications';
import { MicroServiceEntity } from '../../../api/models/micro-service-entity';
import { MicroServicesService } from '../../../api/services/micro-services.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  service: MicroServiceEntity = {};
  deleteVerificationValue: string;
  deleteStarted = false;

  constructor(
    private route: ActivatedRoute,
    private microServiceApi: MicroServicesService,
    private serviceApi: ApiService,
    private notifications: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async p => {
      try {
        const id = p['serviceId'];
        this.service = await this.serviceApi.getCurrentService(id);
      } catch (error) {
        this.notifications.error('Error', 'Unable to get service');
      }
    });
  }

  async update() {
    try {
      await this.microServiceApi.ApiMicroServicesByIdPut({ entity: this.service, id: this.service.id }).toPromise();
      this.router.navigateByUrl('/api-services/list');
      this.notifications.success('Saved', 'Service saved');
    } catch (error) {
      this.notifications.error('Error', 'Error saving service');
    }
  }

  async confirmDelete() {
    try {
      if (this.deleteVerificationValue !== this.service.name) {
        this.notifications.error('Delete Input Mismatch', 'Delete verification mismatch');
      } else {
        await this.microServiceApi.ApiMicroServicesByIdDelete(this.service.id).toPromise();
        this.router.navigateByUrl('/api-services/list');
        this.notifications.success('Deleted', 'Service deleted');
      }
    } catch (error) {
      this.notifications.error('Error', 'Error deleting service');
    }
  }

}
