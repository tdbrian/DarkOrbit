/* tslint:disable */
import { EndpointActions } from './endpoint-actions';

/**
 */
export class EndpointEntity {
    name?: string;
    description?: string;
    endpointActions?: EndpointActions;
    id?: string;
    created?: string;
    lastUpdated?: string;
    createdBy?: string;
    updatedBy?: string;
    deleted?: boolean;
}
