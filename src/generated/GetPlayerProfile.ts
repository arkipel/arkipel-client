/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PlayerInput, CommodityType } from './globalTypes';

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

export interface GetPlayerProfile_player_Player_scoresheet_currencies_currency {
  readonly __typename: 'Currency';
  readonly id: string;
  readonly code: string;
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
  readonly currencies: ReadonlyArray<GetPlayerProfile_player_Player_scoresheet_currencies>;
}

export interface GetPlayerProfile_player_Player {
  readonly __typename: 'Player';
  readonly scoresheet: GetPlayerProfile_player_Player_scoresheet;
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
