import React, { Fragment, useContext, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import { NavLink } from 'react-router-dom';

import { Form } from '../ui/form/Form';
import { Input, Submit, TextArea } from '../ui/form/Input';

import {
  PublishArticle,
  PublishArticleVariables,
} from '../generated/PublishArticle';
import {
  GetRecentArticles,
  GetRecentArticlesVariables,
} from '../generated/GetRecentArticles';

import { SessionContext } from '../libs/session/session';

import { Error, Info, Success } from '../ui/dialog/Msg';

import { DateTime } from 'luxon';

const Home = () => {
  const session = useContext(SessionContext);

  let canWriteArticle = false;
  if (session.id === 'master') {
    canWriteArticle = true;
  }

  const { data, loading, error } = useQuery<
    GetRecentArticles,
    GetRecentArticlesVariables
  >(
    gql`
      query GetRecentArticles($input: RecentArticlesInput!) {
        recentArticles(input: $input) {
          __typename
          ... on ArticleList {
            articles {
              id
              publishedAt
              title
              content
            }
          }
        }
      }
    `,
    { variables: { input: { limit: 5 } } },
  );

  return (
    <Fragment>
      {canWriteArticle && <PublishArticleForm />}
      {loading && <Info>News are loading...</Info>}
      {error && <Info>News could not be loaded...</Info>}
      {data?.recentArticles.articles.map((a) => {
        let time = DateTime.fromISO(a.publishedAt);

        return (
          <StyledArticle key={a.id}>
            <header>
              <div>
                <h1>{a.title}</h1>
              </div>
              <NavLink exact to={'/article/' + a.id}>
                <time dateTime={a.publishedAt}>
                  {time.toFormat('yyyy/LL/dd HH:mm')}
                </time>
              </NavLink>
            </header>
            <div className="content">
              <ReactMarkdown>{a.content}</ReactMarkdown>
            </div>
          </StyledArticle>
        );
      })}
    </Fragment>
  );
};

const StyledArticle = styled.div`
  header {
    h1 {
      display: inline;
      font-size: x-large;
      padding: 0 4px;
      color: #fff;
      background: #000;
    }

    time {
      font-size: small;
      color: #666;
    }
  }

  .content {
    display: grid;
    gap: 10px;

    ul,
    ol {
      margin-left: 20px;
    }
  }
`;

const PublishArticleForm = () => {
  let [publishFailed, setPublishFailed] = useState(false);
  let [publishSucceeded, setPublishSucceeded] = useState(false);

  const defaultValues = {
    title: '',
    content: '',
  };

  const { register, handleSubmit } = useForm<publishArticleParams>({
    defaultValues,
  });

  // Publish mutation
  const [publish] = useMutation<PublishArticle, PublishArticleVariables>(
    gql`
      mutation PublishArticle($input: PublishArticleInput!) {
        publishArticle(input: $input) {
          __typename
          ... on Article {
            id
            publishedAt
            title
            content
          }
        }
      }
    `,
    {
      refetchQueries: ['GetRecentArticles'],
    },
  );

  return (
    <StyledForm
      onSubmit={handleSubmit((params) => {
        publish({
          variables: {
            input: {
              title: params.title,
              content: params.content,
            },
          },
        })
          .then(() => {
            setPublishSucceeded(true);
          })
          .catch(() => {
            setPublishFailed(true);
          });
      })}
    >
      <Input
        style={{ gridArea: 'title' }}
        {...register('title')}
        type="text"
        id="title"
        placeholder="Title"
        min={1}
        disabled={publishSucceeded}
      />
      <TextArea
        style={{ gridArea: 'content', maxWidth: '100%' }}
        {...register('content')}
        type="text"
        id="content"
        placeholder="Content"
        min={1}
        disabled={publishSucceeded}
      />
      <Submit
        style={{ gridArea: 'submit', width: '100%' }}
        value={'Publish'}
        disabled={publishSucceeded}
      />
      <div
        style={{
          display: 'grid',
          gridArea: 'response',
          alignContent: 'center',
        }}
      >
        {publishFailed && <Error>Publication failed.</Error>}
        {publishSucceeded && <Success>Article published.</Success>}
      </div>
    </StyledForm>
  );
};

const StyledForm = styled(Form)`
  width: '100%';

  grid-template-areas:
    'title   title'
    'content content'
    'submit  response';
  grid-template-columns: 1fr 1fr;

  @media all and (max-width: 499px) {
    grid-template-areas:
      'title'
      'content'
      'submit'
      'response';
    grid-template-columns: 1fr;
  }
`;

type publishArticleParams = {
  title: string;
  content: string;
};

export default Home;
