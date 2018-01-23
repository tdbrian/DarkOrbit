/* tslint:disable */
import { RunningService } from './running-service';

export interface ServiceManagerEntity {

  serviceId?: string;

  runningServices?: RunningService[];

  id?: string;

  created?: string;

  lastUpdated?: string;

  createdBy?: string;

  updatedBy?: string;

  deleted?: boolean;
}
