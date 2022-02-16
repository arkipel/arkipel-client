/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RecentArticlesInput } from './globalTypes';

// ====================================================
// GraphQL query operation: GetRecentArticles
// ====================================================

export interface GetRecentArticles_recentArticles_articles {
  readonly __typename: 'Article';
  readonly id: string;
  readonly publishedAt: any;
  readonly title: string;
  readonly content: string;
}

export interface GetRecentArticles_recentArticles {
  readonly __typename: 'ArticleList';
  readonly articles: ReadonlyArray<GetRecentArticles_recentArticles_articles>;
}

export interface GetRecentArticles {
  readonly recentArticles: GetRecentArticles_recentArticles;
}

export interface GetRecentArticlesVariables {
  readonly input: RecentArticlesInput;
}
