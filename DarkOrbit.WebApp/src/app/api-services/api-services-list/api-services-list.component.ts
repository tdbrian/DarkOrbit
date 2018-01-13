import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api-services-list',
  templateUrl: './api-services-list.component.html'
})
export class ApiServicesListComponent implements OnInit {

  rows = [
    { name: 'User Management', type: 'JSONAPI REST', description: 'Handles all user creation, querying, etc.' },
    { name: 'Domain Swaps', type: 'JSONAPI REST', description: 'KFC' },
    { name: 'Price List', type: 'JSONAPI REST', description: 'Burger King' },
  ];

  columns = [
    { prop: 'name' },
    { name: 'Description' },
    { name: 'Type' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
