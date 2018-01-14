import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MicroServiceEntity } from '../../../api/models/micro-service-entity';
import { EndpointEntity } from '../../../api/models/endpoint-entity';
import { EndpointsService } from '../../../api/services/endpoints.service';

@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html'
})
export class EndpointsComponent implements OnInit {
  endpoints: EndpointEntity[] = [];
  isLoading = true;
  currentService = new MicroServiceEntity();
  error: string;

  constructor(
    public apiService: ApiService,
    public endpointsService: EndpointsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadMicroService();
  }

  async loadMicroService() {
    this.error = null;
    const id = this.route.snapshot.params.id;
    if (!id) { this.router.navigateByUrl('../list'); }
    this.currentService = await this.apiService.getCurrentService(id).catch(err => this.error = err);
    this.endpointsService.ApiEndpointsGet();
    this.isLoading = false;
  }

  showEndpoints = () => this.endpoints && !this.isLoading;
  showFirstInfo = () => !this.endpoints && !this.isLoading;
}
