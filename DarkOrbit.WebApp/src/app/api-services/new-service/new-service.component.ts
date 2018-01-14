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

  constructor(private microService: MicroServicesService) { }

  ngOnInit() {
  }

  async createService() {
    this.isSaving = true;
    const newService = {...this.service};
    await this.microService.ApiMicroServicesPost(newService).toPromise()
      .catch(err => this.error = err);
    this.isSaving = false;
  }
}
