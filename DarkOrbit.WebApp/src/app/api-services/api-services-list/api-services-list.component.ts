import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api-services-list',
  templateUrl: './api-services-list.component.html'
})
export class ApiServicesListComponent implements OnInit {

  services = [
    {
      name: 'User Management',
      team: 'White',
      version: '1.0.3',
      type: 'JSONAPI REST',
      description: 'Handles all user creation, querying, etc.'
    },
    {
      name: 'Domain Swaps',
      team: 'White',
      version: '12.2.0',
      type: 'JSONAPI REST',
      description: 'KFC'
    },
    {
      name: 'Price List',
      team: 'White',
      version: '3.1.0',
      type: 'JSONAPI REST',
      description: 'Burger King'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
