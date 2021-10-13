/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PlayerInput, CommodityType, BadgeType } from './globalTypes';

// ====================================================
// GraphQL query operation: GetPlayerProfile
// ====================================================

export interface GetPlayerProfile_player_NotFound {
  readonly __typename: 'NotFound';
}

export interface GetPlayerProfile_player_Player_scoresheet_commodities {
  readonly __typename: 'CommodityScore';
  readonly commodity: CommodityType;
  readonly score: number;
}

export interface GetPlayerProfile_player_Player_scoresheet_buildings {
  readonly __typename: 'BuildingScore';
  readonly score: number;
}

export interface GetPlayerProfile_player_Player_scoresheet_currencies_currency {
  readonly __typename: 'Currency';
  readonly id: string;
}

export interface GetPlayerProfile_player_Player_scoresheet_currencies {
  readonly __typename: 'CurrencyScore';
  readonly currency: GetPlayerProfile_player_Player_scoresheet_currencies_currency;
  readonly score: number;
}

export interface GetPlayerProfile_player_Player_scoresheet {
  readonly __typename: 'Scoresheet';
  readonly id: string;
  readonly score: number;
  readonly commodities: ReadonlyArray<GetPlayerProfile_player_Player_scoresheet_commodities>;
  readonly buildings: ReadonlyArray<GetPlayerProfile_player_Player_scoresheet_buildings>;
  readonly currencies: ReadonlyArray<GetPlayerProfile_player_Player_scoresheet_currencies>;
}

export interface GetPlayerProfile_player_Player_badges {
  readonly __typename: 'Badge';
  readonly id: string;
  readonly createdAt: any;
  readonly type: BadgeType;
}

export interface GetPlayerProfile_player_Player {
  readonly __typename: 'Player';
  readonly scoresheet: GetPlayerProfile_player_Player_scoresheet;
  readonly badges: ReadonlyArray<GetPlayerProfile_player_Player_badges>;
}

export type GetPlayerProfile_player =
  | GetPlayerProfile_player_NotFound
  | GetPlayerProfile_player_Player;

export interface GetPlayerProfile {
  readonly player: GetPlayerProfile_player;
}

export interface GetPlayerProfileVariables {
  readonly input: PlayerInput;
}
