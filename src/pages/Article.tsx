import React, {
  Fragment,
  useContext,
  useState,
  FunctionComponent,
} from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';

import { Form } from '../ui/form/Form';
import { Input, Submit, TextArea } from '../ui/form/Input';
import { Button } from '../ui/form/Button';

import { GetArticle, GetArticleVariables } from '../generated/GetArticle';
import { EditArticle, EditArticleVariables } from '../generated/EditArticle';

import { SessionContext } from '../libs/session/session';

import { Error, Info, Success } from '../ui/dialog/Msg';

import { DateTime } from 'luxon';
import { useParams } from 'react-router';

const Article = () => {
  const session = useContext(SessionContext);

  let [editMode, setEditMode] = useState(false);

  let { articleId } = useParams<{ articleId: string }>();

  let canEditArticle = false;
  if (session.id === 'master') {
    canEditArticle = true;
  }

  const { data, loading, error } = useQuery<GetArticle, GetArticleVariables>(
    gql`
      query GetArticle($input: ArticleInput!) {
        article(input: $input) {
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
    { variables: { input: { articleId } } },
  );

  let a: article = {
    id: '',
    publishedAt: '',
    title: '',
    content: '',
  };

  if (data?.article.__typename === 'Article') {
    a = data.article;
  }

  let time: DateTime = DateTime.now();
  if (a.publishedAt !== '') {
    time = DateTime.fromISO(a.publishedAt);
  }

  return (
    <Fragment>
      {loading && <Info>Article is loading...</Info>}
      {error && <Info>Article could not be loaded...</Info>}
      {editMode && (
        <EditArticleForm
          article={a}
          onClose={() => {
            setEditMode(false);
          }}
        />
      )}
      {!editMode && (
        <StyledArticle key={a.id}>
          <header>
            <h1>{a.title}</h1>
            <time dateTime={a.publishedAt}>
              {time.toFormat('yyyy/LL/dd HH:mm')}
            </time>
            {canEditArticle && (
              <span
                onClick={() => {
                  setEditMode(true);
                }}
              >
                Edit
              </span>
            )}
          </header>
          <div className="content">
            <ReactMarkdown>{a.content}</ReactMarkdown>
          </div>
        </StyledArticle>
      )}
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

    span {
      margin-left: 4px;
      text-decoration: underline;
      font-size: small;
      color: #666;
      cursor: pointer;
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

const EditArticleForm: FunctionComponent<{
  article: article;
  onClose: () => void;
}> = ({ article, onClose }) => {
  let [editFailed, setEditFailed] = useState(false);
  let [editSucceeded, setEditSucceeded] = useState(false);

  const defaultValues = {
    title: article.title,
    content: article.content,
  };

  const { register, handleSubmit } = useForm<editArticleParams>({
    defaultValues,
  });

  // Edit mutation
  const [edit] = useMutation<EditArticle, EditArticleVariables>(
    gql`
      mutation EditArticle($input: EditArticleInput!) {
        editArticle(input: $input) {
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
      refetchQueries: ['GetArticle'],
    },
  );

  return (
    <StyledForm
      onSubmit={handleSubmit((params) => {
        edit({
          variables: {
            input: {
              articleId: article.id,
              title: params.title,
              content: params.content,
            },
          },
        })
          .then(() => {
            setEditSucceeded(true);
          })
          .catch(() => {
            setEditFailed(true);
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
        disabled={editSucceeded}
      />
      <TextArea
        style={{ gridArea: 'content', maxWidth: '100%' }}
        {...register('content')}
        type="text"
        id="content"
        placeholder="Content"
        min={1}
        disabled={editSucceeded}
      />
      <Submit
        style={{ gridArea: 'submit', width: '100%' }}
        value={'Save'}
        disabled={editSucceeded}
      />
      <Button
        style={{ gridArea: 'close', width: '100%' }}
        onClick={(e) => {
          e.preventDefault();
          onClose();
        }}
      >
        Close
      </Button>
      <div
        style={{
          display: 'grid',
          gridArea: 'response',
          alignContent: 'center',
        }}
      >
        {editFailed && <Error>Publication failed.</Error>}
        {editSucceeded && <Success>Article published.</Success>}
      </div>
    </StyledForm>
  );
};

type article = {
  id: string;
  publishedAt: string;
  title: string;
  content: string;
};

const StyledForm = styled(Form)`
  width: '100%';

  grid-template-areas:
    'title   title'
    'content content'
    'submit  response'
    'close   .';
  grid-template-columns: 1fr 1fr;

  @media all and (max-width: 499px) {
    grid-template-areas:
      'title'
      'content'
      'submit'
      'response'
      'close';
    grid-template-columns: 1fr;
  }
`;

type editArticleParams = {
  title: string;
  content: string;
};

export default Article;
