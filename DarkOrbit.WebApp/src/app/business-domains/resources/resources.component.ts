import { Component, OnInit } from '@angular/core';
import { ResourceEntity } from '../../api/models/resource-entity';
import { ApiService } from '../../api-services/api-service/api.service';
import { ResourcesService } from '../../api/services/resources.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

export type ResourceFormModes = 'NotSelected'|'New'|'Edit';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styles: []
})
export class ResourcesComponent implements OnInit {
  firstView = true;
  resources: ResourceEntity[] = [];
  isLoading = true;
  rawCurrentResource: ResourceEntity;
  currentResource: ResourceEntity;
  error: string;
  formMode: ResourceFormModes = 'NotSelected';

  constructor(
    public apiService: ApiService,
    public resourcesService: ResourcesService,
    private router: Router,
    private route: ActivatedRoute,
    private notifications: NotificationsService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.currentResource = this.generateNewResource();
    this.error = null;
    const id = this.route.snapshot.params.id;
    if (!id) { this.router.navigateByUrl('/business-domains/resources/list'); }
    this.resources = await this.resourcesService.ApiResourcesGet().toPromise().catch(err => this.error = err);
    if (this.resources.length > 0) { this.firstView = false; }
    this.isLoading = false;
  }

  startNewResource() {
    this.currentResource = this.generateNewResource();
    this.firstView = false;
    this.formMode = 'New';
  }

  selectResource(resource) {
    this.rawCurrentResource = {...resource};
    this.currentResource = resource;
    this.formMode = 'Edit';
  }

  cancelNewEditResource() {
    const currentResourceIndex = this.resources.findIndex(e => e.id === this.currentResource.id);
    this.resources[currentResourceIndex] = this.rawCurrentResource;
    this.currentResource = this.generateNewResource();
    this.formMode = 'NotSelected';
  }

  async saveResource() {
    if (this.formMode === 'New') {
      const newResource = {...this.currentResource};
      this.resources.push(newResource);
      this.currentResource = newResource;
      this.formMode = 'Edit';
      this.rawCurrentResource =  {...newResource};
      await this.createResource(newResource);
      this.notifications.success('Created', 'Resource Created');
    }
    if (this.formMode === 'Edit') {
      this.rawCurrentResource =  {...this.currentResource};
      await this.updateResource();
      this.notifications.success('Saved', `Resource Saved`);
    }
  }

  createResource = async (resource) => await this.resourcesService.ApiResourcesPost(resource)
    .toPromise()
    .catch(err => console.error(this.notifications.error('Create Error', 'Error creating resource')))

  updateResource = async () => await this.resourcesService
    .ApiResourcesByIdPut({ entity: this.currentResource, id: this.currentResource.id })
    .toPromise()
    .catch(err => console.error('Save Error', 'Error saving resource'))

  async deleteResource() {
    let resourceToBeDeleted = this.resources.find(e => e.id === this.currentResource.id);
    resourceToBeDeleted = {...resourceToBeDeleted};
    this.resources = this.resources.filter(e => e.id !== this.currentResource.id);
    this.currentResource = this.generateNewResource();
    this.formMode = 'NotSelected';

    try {
      await this.resourcesService.ApiResourcesByIdDelete(resourceToBeDeleted.id).toPromise();
      this.notifications.success('Deleted', `Resource Deleted`);
    } catch (error) {
      this.resources.push(resourceToBeDeleted);
      this.notifications.error('Delete Error', 'Error deleting resource');
    }
  }

  private generateNewResource(): ResourceEntity {
    const resource = {} as ResourceEntity;
    return resource;
  }
}
