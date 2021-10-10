/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PlayerInput, Infrastructure, CommodityType } from './globalTypes';

// ====================================================
// GraphQL query operation: GetPublicPlayerProfile
// ====================================================

export interface GetPublicPlayerProfile_player_NotFound {
  readonly __typename: 'NotFound';
}

export interface GetPublicPlayerProfile_player_Player_island_tiles {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly position: number;
  readonly infrastructure: Infrastructure;
  readonly level: number;
}

export interface GetPublicPlayerProfile_player_Player_island {
  readonly __typename: 'Island';
  readonly name: string;
  readonly tiles: ReadonlyArray<GetPublicPlayerProfile_player_Player_island_tiles>;
}

export interface GetPublicPlayerProfile_player_Player_scoresheet_commodities {
  readonly __typename: 'CommodityScore';
  readonly commodity: CommodityType;
  readonly score: number;
}

export interface GetPublicPlayerProfile_player_Player_scoresheet_buildings {
  readonly __typename: 'BuildingScore';
  readonly score: number;
}

export interface GetPublicPlayerProfile_player_Player_scoresheet_currencies_currency {
  readonly __typename: 'Currency';
  readonly id: string;
}

export interface GetPublicPlayerProfile_player_Player_scoresheet_currencies {
  readonly __typename: 'CurrencyScore';
  readonly currency: GetPublicPlayerProfile_player_Player_scoresheet_currencies_currency;
  readonly score: number;
}

export interface GetPublicPlayerProfile_player_Player_scoresheet {
  readonly __typename: 'Scoresheet';
  readonly id: string;
  readonly score: number;
  readonly commodities: ReadonlyArray<GetPublicPlayerProfile_player_Player_scoresheet_commodities>;
  readonly buildings: ReadonlyArray<GetPublicPlayerProfile_player_Player_scoresheet_buildings>;
  readonly currencies: ReadonlyArray<GetPublicPlayerProfile_player_Player_scoresheet_currencies>;
}

export interface GetPublicPlayerProfile_player_Player {
  readonly __typename: 'Player';
  readonly id: string;
  readonly name: string;
  readonly island: GetPublicPlayerProfile_player_Player_island;
  readonly scoresheet: GetPublicPlayerProfile_player_Player_scoresheet;
}

export type GetPublicPlayerProfile_player =
  | GetPublicPlayerProfile_player_NotFound
  | GetPublicPlayerProfile_player_Player;

export interface GetPublicPlayerProfile {
  readonly player: GetPublicPlayerProfile_player;
}

export interface GetPublicPlayerProfileVariables {
  readonly input: PlayerInput;
}
