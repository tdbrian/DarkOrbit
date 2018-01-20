/* tslint:disable */
import { ProcessStep } from './process-step';
import { Input } from './input';
import { Output } from './output';

export interface ProcessEntity {

  id?: string;

  name?: string;

  steps?: ProcessStep[];

  inputs?: Input[];

  outputs?: Output[];

  description?: string;

  created?: string;

  lastUpdated?: string;

  createdBy?: string;

  updatedBy?: string;

  deleted?: boolean;
}
