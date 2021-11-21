/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PublishArticleInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: PublishArticle
// ====================================================

export interface PublishArticle_publishArticle_NotFound {
  readonly __typename: 'NotFound' | 'NotAuthorized';
}

export interface PublishArticle_publishArticle_Article {
  readonly __typename: 'Article';
  readonly id: string;
  readonly publishedAt: any;
  readonly title: string;
  readonly content: string;
}

export type PublishArticle_publishArticle =
  | PublishArticle_publishArticle_NotFound
  | PublishArticle_publishArticle_Article;

export interface PublishArticle {
  readonly publishArticle: PublishArticle_publishArticle;
}

export interface PublishArticleVariables {
  readonly input: PublishArticleInput;
}
