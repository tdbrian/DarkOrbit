import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MicroServiceEntity } from '../../../api/models/micro-service-entity';
import { EndpointEntity } from '../../../api/models/endpoint-entity';
import { EndpointsService } from '../../../api/services/endpoints.service';
import { EndpointActions } from '../../../api/models/endpoint-actions';
import { NotificationsService } from 'angular2-notifications';

export type EndpointFormModes = 'NotSelected'|'New'|'Edit';

@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html'
})
export class EndpointsComponent implements OnInit {
  firstView = true;
  endpoints: EndpointEntity[] = [];
  isLoading = true;
  currentService = {} as MicroServiceEntity;
  rawCurrentEndpoint: EndpointEntity;
  currentEndpoint: EndpointEntity;
  error: string;
  formMode: EndpointFormModes = 'NotSelected';

  constructor(
    public apiService: ApiService,
    public endpointsService: EndpointsService,
    private router: Router,
    private route: ActivatedRoute,
    private notifications: NotificationsService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.currentEndpoint = this.generateNewEndpoint();
    this.error = null;
    const id = this.route.snapshot.params.id;
    if (!id) { this.router.navigateByUrl('../list'); }
    try {
      this.currentService = await this.apiService.getCurrentService(id);
      this.endpoints = await this.endpointsService.ApiEndpointsGet().toPromise();
    } catch (error) {
      this.notifications.error('Error', 'Unable initial endpoints information');
    }
    if (this.endpoints.length > 0) { this.firstView = false; }
    this.isLoading = false;
  }

  startNewEndpoint() {
    this.currentEndpoint = this.generateNewEndpoint();
    this.firstView = false;
    this.formMode = 'New';
  }

  selectEndpoint(endpoint) {
    this.rawCurrentEndpoint = {...endpoint};
    this.currentEndpoint = endpoint;
    this.formMode = 'Edit';
  }

  cancelNewEditEndpoint() {
    const currentEndpointIndex = this.endpoints.findIndex(e => e.id === this.currentEndpoint.id);
    this.endpoints[currentEndpointIndex] = this.rawCurrentEndpoint;
    this.currentEndpoint = this.generateNewEndpoint();
    this.formMode = 'NotSelected';
  }

  async saveEndpoint() {
    if (this.formMode === 'New') {
      const newEndpoint = {...this.currentEndpoint};
      this.endpoints.push(newEndpoint);
      this.currentEndpoint = newEndpoint;
      this.formMode = 'NotSelected';
      this.rawCurrentEndpoint =  {...newEndpoint};
      try {
        await this.createEndpoint(newEndpoint);
        this.notifications.success('Created', 'Endpoint Created');
        this.endpoints = await this.endpointsService.ApiEndpointsGet().toPromise();
      } catch (error) {
        this.notifications.error('Error', 'Error creating new endpoint');
      }
    }
    if (this.formMode === 'Edit') {
      this.rawCurrentEndpoint =  {...this.currentEndpoint};
      try {
        await this.updateEndpoint();
        this.notifications.success('Saved', `Endpoint Saved`);
      } catch (error) {
        this.notifications.error('Error', 'Error saving new endpoint');
      }
    }
  }

  createEndpoint = async (endpoint) => await this.endpointsService.ApiEndpointsPost(endpoint)
    .toPromise()

  updateEndpoint = async () => await this.endpointsService
    .ApiEndpointsByIdPut({ entity: this.currentEndpoint, id: this.currentEndpoint.id })
    .toPromise()

  async deleteEndpoint() {
    let endpointToBeDeleted = this.endpoints.find(e => e.id === this.currentEndpoint.id);
    endpointToBeDeleted = {...endpointToBeDeleted};
    this.endpoints = this.endpoints.filter(e => e.id !== this.currentEndpoint.id);
    this.currentEndpoint = this.generateNewEndpoint();
    this.formMode = 'NotSelected';

    try {
      await this.endpointsService.ApiEndpointsByIdDelete(endpointToBeDeleted.id).toPromise();
      this.notifications.success('Deleted', `Endpoint Deleted`);
    } catch (error) {
      this.endpoints.push(endpointToBeDeleted);
      this.notifications.error('Delete Error', 'Error deleting endpoint');
    }
  }

  private generateNewEndpoint(): EndpointEntity {
    const endpoint = {} as EndpointEntity;
    const actions = {} as EndpointActions;
    endpoint.endpointActions = actions;
    return endpoint;
  }
}
