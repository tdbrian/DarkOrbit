import { Component, OnInit } from '@angular/core';
import { EndpointEntity } from '../../../api/models/endpoint-entity';
import { MicroServiceEntity } from '../../../api/models/micro-service-entity';
import { NotificationsService } from 'angular2-notifications';
import { EndpointsService } from '../../../api/services/endpoints.service';
import { MicroServicesService } from '../../../api/services/micro-services.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EndpointMethod } from '../../../api/models/endpoint-method';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.scss']
})
export class EndpointComponent implements OnInit {
  isLoading = true;
  firstView = true;
  endpoints: EndpointEntity[] = [];
  endpoint: EndpointEntity;
  service: MicroServiceEntity;

  constructor(
    private notifications: NotificationsService,
    private endpointsSvc: EndpointsService,
    private servicesSvc: MicroServicesService,
    private route: ActivatedRoute,
    private router: Router) { }

  async ngOnInit() {
    this.route.params.subscribe(async ({ serviceId, endpointId }) => {
      try {
        [this.endpoints, this.service] = await Promise.all([
          this.endpointsSvc.ApiEndpointsByServiceByServiceIdGet(serviceId).toPromise(),
          this.servicesSvc.ApiMicroServicesByIdGet(serviceId).toPromise()
        ]);
        this.endpoint = this.endpoints.find(endpoint => endpoint.id === endpointId);
        if (this.endpoint === null) {
          this.notifications.error('Error', 'Endpoint not found.');
          this.router.navigateByUrl('../');
        }
        if (this.endpoint.endpointMethods.length > 0) {
          this.firstView = true;
        }
        this.isLoading = false;
      } catch (error) {
        this.notifications.error('Error', 'Getting initial data');
      }
    });
  }

  async addAll() {
    this.addEndpointMethod('Get', 'Get ' + this.endpoint.name);
    this.addEndpointMethod('Get', 'Get List of ' + this.endpoint.name);
    this.addEndpointMethod('Post', 'Create ' + this.endpoint.name);
    this.addEndpointMethod('Put', 'Update ' + this.endpoint.name);
    this.addEndpointMethod('Delete', 'Delete ' + this.endpoint.name);
  }

  async addGetOne() {
    this.addEndpointMethod('Get', 'Get ' + this.endpoint.name);
  }

  async addGetMultiple() {
    this.addEndpointMethod('Get', 'Get List of ' + this.endpoint.name);
  }

  async addPost() {
    this.addEndpointMethod('Post', 'Create ' + this.endpoint.name);
  }

  async addPut() {
    this.addEndpointMethod('Put', 'Update ' + this.endpoint.name);
  }

  async addDelete() {
    this.addEndpointMethod('Delete', 'Delete ' + this.endpoint.name);
  }

  private async addEndpointMethod(type: string, name: string) {
    const endpointMethod = <EndpointMethod> {
      name,
      description: '',
      processId: null,
      subRouteFragments: [],
      type
    };
    if (this.endpoint.endpointMethods === null) { this.endpoint.endpointMethods = []; }
    this.endpoint.endpointMethods.push(endpointMethod);
  }
}
