/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CitizenInput } from './globalTypes';

// ====================================================
// GraphQL query operation: GetCitizen
// ====================================================

export interface GetCitizen_citizen_NotFound {
  readonly __typename: 'NotFound';
}

export interface GetCitizen_citizen_Citizen {
  readonly __typename: 'Citizen';
  readonly id: string;
  readonly name: string;
  readonly createdAt: any;
}

export type GetCitizen_citizen =
  | GetCitizen_citizen_NotFound
  | GetCitizen_citizen_Citizen;

export interface GetCitizen {
  readonly citizen: GetCitizen_citizen;
}

export interface GetCitizenVariables {
  readonly input: CitizenInput;
}
