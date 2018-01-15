import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MicroServiceEntity } from '../../../api/models/micro-service-entity';
import { EndpointEntity } from '../../../api/models/endpoint-entity';
import { EndpointsService } from '../../../api/services/endpoints.service';

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
  currentEndpoint = new EndpointEntity();
  error: string;
  formMode: EndpointFormModes = 'NotSelected';

  constructor(
    public apiService: ApiService,
    public endpointsService: EndpointsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.error = null;
    const id = this.route.snapshot.params.id;
    if (!id) { this.router.navigateByUrl('../list'); }
    this.currentService = await this.apiService.getCurrentService(id).catch(err => this.error = err);
    this.endpoints = await this.endpointsService.ApiEndpointsGet().toPromise().catch(err => this.error = err);
    if (this.endpoints.length > 0) { this.firstView = false; }
    this.isLoading = false;
  }

  startNewEndpoint() {
    this.currentEndpoint = new EndpointEntity();
    this.firstView = false;
    this.formMode = 'New';
  }

  selectEndpoint(endpoint) {
    this.currentEndpoint = endpoint;
    this.formMode = 'Edit';
  }

  cancelNewEditEndpoint() {
    this.currentEndpoint = new EndpointEntity();
    this.formMode = 'NotSelected';
  }

  saveEndpoint() {
    if (this.formMode === 'New') { this.createEndpoint(); }
    if (this.formMode === 'Edit') { this.updateEndpoint(); }
  }

  createEndpoint = async () => await this.endpointsService.ApiEndpointsPost(this.currentEndpoint).toPromise();

  updateEndpoint = async () => await this.endpointsService
    .ApiEndpointsByIdPut({ entity: this.currentEndpoint, id: this.currentEndpoint.id })
    .toPromise()

  async deleteEndpoint() {
    await this.endpointsService.ApiEndpointsByIdDelete(this.currentEndpoint.id)
      .toPromise()
      .catch(err => this.error);

    this.currentEndpoint = new EndpointEntity();
    this.formMode = 'NotSelected';
  }
}
