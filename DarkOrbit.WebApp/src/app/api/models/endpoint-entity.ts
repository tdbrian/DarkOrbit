/* tslint:disable */
import { EndpointMethod } from './endpoint-method';

export interface EndpointEntity {

  id?: string;

  name?: string;

  serviceId?: string;

  requiresAuthentication?: boolean;

  endpointMethods?: EndpointMethod[];

  description?: string;

  created?: string;

  lastUpdated?: string;

  createdBy?: string;

  updatedBy?: string;

  deleted?: boolean;
}
