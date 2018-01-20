import { Component, OnInit } from '@angular/core';
import { EndpointEntity } from '../../../api/models/endpoint-entity';
import { MicroServiceEntity } from '../../../api/models/micro-service-entity';
import { NotificationsService } from 'angular2-notifications';
import { EndpointsService } from '../../../api/services/endpoints.service';
import { MicroServicesService } from '../../../api/services/micro-services.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.scss']
})
export class EndpointComponent implements OnInit {
  isLoading = true;
  firstView = true;
  endpoints: EndpointEntity[];
  endpoint: EndpointEntity;
  service: MicroServiceEntity;
  methods = [
    {
      path: '/api/v1/domains/{:id}',
      type: 'Get Single'
    },
    {
      path: '/api/v1/domains',
      type: 'Get Multiple'
    },
    {
      path: '/api/v1/domains/{id}',
      type: 'Put'
    },
    {
      path: '/api/v1/domains',
      type: 'Post'
    },
    {
      path: '/api/v1/domains',
      type: 'Delete'
    }
  ];

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

  newMethod() {

  }
}
