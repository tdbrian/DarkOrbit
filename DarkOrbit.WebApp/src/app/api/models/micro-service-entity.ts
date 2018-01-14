/* tslint:disable */
import { ObjectId } from './object-id';

/**
 */
export class MicroServiceEntity {
    name?: string;
    description?: string;
    id?: ObjectId;
    created?: string;
    lastUpdated?: string;
    createdBy?: string;
    updatedBy?: string;
    deleted?: boolean;
}
