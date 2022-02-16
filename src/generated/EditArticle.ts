/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditArticleInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: EditArticle
// ====================================================

export interface EditArticle_editArticle_NotFound {
  readonly __typename: 'NotFound' | 'NotAuthorized';
}

export interface EditArticle_editArticle_Article {
  readonly __typename: 'Article';
  readonly id: string;
  readonly publishedAt: any;
  readonly title: string;
  readonly content: string;
}

export type EditArticle_editArticle =
  | EditArticle_editArticle_NotFound
  | EditArticle_editArticle_Article;

export interface EditArticle {
  readonly editArticle: EditArticle_editArticle;
}

export interface EditArticleVariables {
  readonly input: EditArticleInput;
}
