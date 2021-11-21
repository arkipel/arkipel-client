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

import arkipelLogo256 from '../assets/logo/arkipel_256.png';
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
      <div style={{ display: 'flex' }}>
        <img
          style={{ float: 'left', marginRight: '10px' }}
          src={arkipelLogo256}
          alt="Arkipel logo (256 pixels)"
          height={128}
          width={128}
        />
        <p>
          <i>
            Arkipel is a persistent browser-based game that takes place in a
            fictional archipelago called Arkipel. Players must manage and grow a
            small island to compete economically and politically against each
            other. The global market is built on the trust of currencies created
            by players.
          </i>
        </p>
      </div>
      {canWriteArticle && <PublishArticleForm />}
      {loading && <Info>News are loading...</Info>}
      {error && <Info>News could not be loaded...</Info>}
      {data?.recentArticles.articles.map((a) => {
        let time = DateTime.fromISO(a.publishedAt);

        return (
          <StyledArticle key={a.id}>
            <header>
              <h1>{a.title}</h1>
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
      font-size: x-large;
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
        let res = publish({
          variables: {
            input: {
              title: params.title,
              content: params.content,
            },
          },
        });

        res
          .then((e) => {
            setPublishSucceeded(true);
          })
          .catch((e) => {
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
