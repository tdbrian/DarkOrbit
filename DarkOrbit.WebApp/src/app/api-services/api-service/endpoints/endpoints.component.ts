import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MicroServiceEntity } from '../../../api/models/micro-service-entity';
import { EndpointEntity } from '../../../api/models/endpoint-entity';
import { EndpointsService } from '../../../api/services/endpoints.service';
import { EndpointActions } from '../../../api/models/endpoint-actions';

export type EndpointFormModes = 'NotSelected'|'New'|'Edit';

@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html'
})
export class EndpointsComponent implements OnInit {
  firstView = true;
  endpoints: EndpointEntity[] = [];
  isLoading = true;
  currentService = new MicroServiceEntity();
  rawCurrentEndpoint: EndpointEntity;
  currentEndpoint: EndpointEntity;
  error: string;
  formMode: EndpointFormModes = 'NotSelected';

  constructor(
    public apiService: ApiService,
    public endpointsService: EndpointsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.currentEndpoint = this.generateNewEndpoint();
    this.error = null;
    const id = this.route.snapshot.params.id;
    if (!id) { this.router.navigateByUrl('../list'); }
    this.currentService = await this.apiService.getCurrentService(id).catch(err => this.error = err);
    this.endpoints = await this.endpointsService.ApiEndpointsGet().toPromise().catch(err => this.error = err);
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
      await this.createEndpoint(newEndpoint);
      this.formMode = 'Edit';
      this.rawCurrentEndpoint =  {...newEndpoint};
    }
    if (this.formMode === 'Edit') {
      this.rawCurrentEndpoint =  {...this.currentEndpoint};
      this.updateEndpoint();
    }
  }

  createEndpoint = async (endpoint) => await this.endpointsService.ApiEndpointsPost(endpoint)
    .toPromise()
    .catch(err => console.error('Error creating new endpoint!!'))

  updateEndpoint = async () => await this.endpointsService
    .ApiEndpointsByIdPut({ entity: this.currentEndpoint, id: this.currentEndpoint.id })
    .toPromise()
    .catch(err => console.error('Error saving endpoint!!'))

  async deleteEndpoint() {
    this.endpointsService.ApiEndpointsByIdDelete(this.currentEndpoint.id)
      .toPromise()
      .catch(err => this.error);

    this.endpoints = this.endpoints.filter(e => e.id !== this.currentEndpoint.id);
    this.currentEndpoint = this.generateNewEndpoint();
    this.formMode = 'NotSelected';
  }

  private generateNewEndpoint(): EndpointEntity {
    const endpoint = new EndpointEntity();
    const actions = new EndpointActions();
    endpoint.endpointActions = actions;
    return endpoint;
  }
}
