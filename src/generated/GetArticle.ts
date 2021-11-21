/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleInput } from './globalTypes';

// ====================================================
// GraphQL query operation: GetArticle
// ====================================================

export interface GetArticle_article_NotFound {
  readonly __typename: 'NotFound';
}

export interface GetArticle_article_Article {
  readonly __typename: 'Article';
  readonly id: string;
  readonly publishedAt: any;
  readonly title: string;
  readonly content: string;
}

export type GetArticle_article =
  | GetArticle_article_NotFound
  | GetArticle_article_Article;

export interface GetArticle {
  readonly article: GetArticle_article;
}

export interface GetArticleVariables {
  readonly input: ArticleInput;
}
