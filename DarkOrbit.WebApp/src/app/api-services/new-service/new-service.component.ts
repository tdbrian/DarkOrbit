import { Component, OnInit } from '@angular/core';
import { MicroServiceEntity } from '../../api/models/micro-service-entity';
import { MicroServicesService } from '../../api/services/micro-services.service';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styles: []
})
export class NewServiceComponent implements OnInit {
  service = new MicroServiceEntity();
  isSaving = false;
  error: string;
  isJsonApi: boolean;

  constructor(private microService: MicroServicesService) { }

  ngOnInit() {
  }

  async createService() {
    this.isSaving = true;
    this.setServiceType();
    const newService = {...this.service};
    await this.microService.ApiMicroServicesPost(newService).toPromise()
      .catch(err => this.error = err);
    this.isSaving = false;
  }

  private setServiceType() {
    if (this.isJsonApi) {
      this.service.type = 'JsonApi';
    } else if (this.service.type == null || this.service.type.length === 0) {
      this.service.type = 'Standard';
    }
  }
}
