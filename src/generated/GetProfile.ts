/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProfile
// ====================================================

export interface GetProfile_me_NotFound {
  readonly __typename: 'NotFound' | 'NotAuthorized';
}

export interface GetProfile_me_User {
  readonly __typename: 'User';
  readonly id: string;
  readonly username: string;
  readonly emailAddress: string | null;
  readonly emailAddressVerified: boolean;
  readonly createdAt: any;
  readonly lastActivityAt: any | null;
  readonly numberTiles: number;
}

export type GetProfile_me = GetProfile_me_NotFound | GetProfile_me_User;

export interface GetProfile {
  readonly me: GetProfile_me;
}

export interface GetProfileVariables {
  readonly userID: string;
}
