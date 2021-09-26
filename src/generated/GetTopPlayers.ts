/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TopPlayersInput } from './globalTypes';

// ====================================================
// GraphQL query operation: GetTopPlayers
// ====================================================

export interface GetTopPlayers_topPlayers_players_scoresheet {
  readonly __typename: 'Scoresheet';
  readonly id: string;
  readonly score: number;
}

export interface GetTopPlayers_topPlayers_players {
  readonly __typename: 'Player';
  readonly id: string;
  readonly name: string;
  readonly scoresheet: GetTopPlayers_topPlayers_players_scoresheet;
}

export interface GetTopPlayers_topPlayers {
  readonly __typename: 'TopPlayers';
  readonly players: ReadonlyArray<GetTopPlayers_topPlayers_players> | null;
}

export interface GetTopPlayers {
  readonly topPlayers: GetTopPlayers_topPlayers;
}

export interface GetTopPlayersVariables {
  readonly input: TopPlayersInput;
}
