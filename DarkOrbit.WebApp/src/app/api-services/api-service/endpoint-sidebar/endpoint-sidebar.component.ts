import { Component, OnInit, Input } from '@angular/core';
import { EndpointEntity } from '../../../api/models/endpoint-entity';
import { MicroServiceEntity } from '../../../api/models/micro-service-entity';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-endpoint-sidebar',
  templateUrl: './endpoint-sidebar.component.html'
})
export class EndpointSidebarComponent implements OnInit {
  @Input() endpoints: EndpointEntity[];

  constructor(public apiSvc: ApiService) { }

  ngOnInit() {
  }

}
