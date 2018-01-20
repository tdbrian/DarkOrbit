/* tslint:disable */

export interface ProcessStep {

  name?: string;

  parentStep?: string;

  order?: number;

  nestedDepth?: number;

  type?: string;
}
