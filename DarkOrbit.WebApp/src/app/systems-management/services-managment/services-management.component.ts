import { Component, OnInit } from '@angular/core';
import { ServiceManagerEntity } from '../../api/models/service-manager-entity';
import { ApiService } from '../../api-services/api-service/api.service';
import { ServiceManagerService } from '../../api/services/service-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

export type ServiceManagerFormModes = 'NotSelected'|'Selected';

@Component({
  selector: 'app-services-management',
  templateUrl: './services-management.component.html',
  styles: []
})
export class ServicesManagementComponent implements OnInit {
  firstView = true;
  serviceManagers: ServiceManagerEntity[] = [];
  isLoading = true;
  rawCurrentServiceManager: ServiceManagerEntity;
  currentServiceManager: ServiceManagerEntity;
  formMode: ServiceManagerFormModes = 'NotSelected';

  constructor(
    public serviceManagersService: ServiceManagerService,
    private router: Router,
    private route: ActivatedRoute,
    private notifications: NotificationsService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    try {
      this.serviceManagers = await this.serviceManagersService.ApiServiceManagerGet().toPromise();
    } catch (error) {
      this.notifications.error('Error', 'Unable to get serviceManagers');
    }
    if (this.serviceManagers.length > 0) { this.firstView = false; }
    this.isLoading = false;
  }

  selectServiceManager(serviceManager) {
    this.rawCurrentServiceManager = { ...serviceManager };
    this.currentServiceManager = serviceManager;
    this.formMode = 'Selected';
  }

  closeDetails() {
    this.currentServiceManager = null;
    this.formMode = 'NotSelected';
  }

  async restartService(serviceManager) {
    try {
      await this.serviceManagersService.ApiServiceManagerRestartPut(serviceManager).toPromise();
    } catch (error) {
      this.notifications.error('Error', 'Unable to restart service');
    }
  }

  async stopService(serviceManager) {
    try {
      await this.serviceManagersService.ApiServiceManagerStopPut(serviceManager).toPromise();
    } catch (error) {
      this.notifications.error('Error', 'Unable to stop service');
    }
  }
}
