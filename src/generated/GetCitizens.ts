/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CitizensFromIslandInput } from './globalTypes';

// ====================================================
// GraphQL query operation: GetCitizens
// ====================================================

export interface GetCitizens_citizensFromIsland_NotFound {
  readonly __typename: 'NotFound';
}

export interface GetCitizens_citizensFromIsland_CitizenList_citizens {
  readonly __typename: 'Citizen';
  readonly id: string;
  readonly createdAt: any;
  readonly name: string;
}

export interface GetCitizens_citizensFromIsland_CitizenList {
  readonly __typename: 'CitizenList';
  readonly citizens: ReadonlyArray<GetCitizens_citizensFromIsland_CitizenList_citizens>;
}

export type GetCitizens_citizensFromIsland =
  | GetCitizens_citizensFromIsland_NotFound
  | GetCitizens_citizensFromIsland_CitizenList;

export interface GetCitizens {
  readonly citizensFromIsland: GetCitizens_citizensFromIsland;
}

export interface GetCitizensVariables {
  readonly input: CitizensFromIslandInput;
}
