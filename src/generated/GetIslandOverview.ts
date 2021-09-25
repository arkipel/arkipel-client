/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetIslandOverview
// ====================================================

export interface GetIslandOverview_island_NotFound {
  readonly __typename: "NotFound" | "NotAuthorized";
}

export interface GetIslandOverview_island_Island_owner {
  readonly __typename: "User";
  readonly id: string;
  readonly name: string;
}

export interface GetIslandOverview_island_Island {
  readonly __typename: "Island";
  readonly id: string;
  readonly name: string;
  readonly owner: GetIslandOverview_island_Island_owner;
}

export type GetIslandOverview_island = GetIslandOverview_island_NotFound | GetIslandOverview_island_Island;

export interface GetIslandOverview {
  readonly island: GetIslandOverview_island;
}

export interface GetIslandOverviewVariables {
  readonly islandId: string;
}
