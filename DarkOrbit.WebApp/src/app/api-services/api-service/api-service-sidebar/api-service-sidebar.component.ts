import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-api-service-sidebar',
  templateUrl: './api-service-sidebar.component.html'
})
export class ApiServiceSidebarComponent implements OnInit {

  constructor(public apiSvc: ApiService) { }

  ngOnInit() {
  }

}
