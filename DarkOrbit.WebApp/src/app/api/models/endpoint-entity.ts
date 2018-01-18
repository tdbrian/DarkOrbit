/* tslint:disable */
import { EndpointActions } from './endpoint-actions';

export interface EndpointEntity {

  name?: string;

  description?: string;

  serviceId?: string;

  endpointActions?: EndpointActions;

  id?: string;

  created?: string;

  lastUpdated?: string;

  createdBy?: string;

  updatedBy?: string;

  deleted?: boolean;
}
