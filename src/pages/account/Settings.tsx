import React, { Fragment, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, FormContext } from 'react-hook-form';

import { useMutation, gql, useApolloClient } from '@apollo/client';

import { SessionContext } from '../../libs/session/session';

import UsernameInput from '../../components/usernameInput';
import PasswordInput from '../../components/passwordInput';

const Settings = () => {
  // Router
  let history = useHistory();

  // Session
  const session = useContext(SessionContext);

  useEffect(() => {
    if (!session.loggedIn) {
      history.push('/');
    }
  });

  return (
    <Fragment>
      <h1>Settings</h1>
      <h2>Username</h2>
      <ChangeUsernameForm />
      <h2>Email address</h2>
      <p>
        Your email address will always be private and only used for necessary
        communication like password resets.
      </p>
      <ChangeEmailAddress />
      <h2>Password</h2>
      <ChangePassword />
      <h2>Delete account</h2>
      <p>
        To delete your account, simply stop logging in. Accounts hold no
        personal information except for the email address (which is never public
        and can be deleted) and are deleted after 30 days of inactivity.
      </p>
    </Fragment>
  );
};

const ChangeUsernameForm = () => {
  const session = useContext(SessionContext);

  const formFunctions = useForm<{
    username: string;
  }>({
    mode: 'onChange',
    validateCriteriaMode: 'all',
    defaultValues: { username: session.username },
  });
  const { handleSubmit, formState, errors, setError, watch } = formFunctions;

  const [setUsername, { data, loading, error }] = useMutation(
    gql`
      mutation setUsername($userID: String!, $username: String!) {
        setUsername(userID: $userID, new: $username) {
          __typename
        }
      }
    `,
  );

  const username = watch('username');

  if (
    data?.setUsername?.__typename === 'Result' &&
    username !== session.username
  ) {
    session.update({ username });
  }

  const client = useApolloClient();

  return (
    <Fragment>
      <FormContext {...formFunctions}>
        <form
          onSubmit={handleSubmit(async ({ username }) => {
            try {
              let response = await client.mutate({
                mutation: gql`
                  mutation setUsername($userID: String!, $username: String!) {
                    setUsername(userID: $userID, new: $username) {
                      __typename
                    }
                  }
                `,
                variables: { userID: session.id, username },
              });

              if (response?.data?.setUsername?.__typename === 'Result') {
                session.update({ username });
              }
            } catch {
              console.log('FAIL!');
              setError('username', 'submit', 'that did not work');
            }
            // setUsername({
            //   variables: { userID: session.id, username },
            // });
          })}
        >
          <UsernameInput current={session.username} />
          <p>
            <input
              type="submit"
              value="Update"
              disabled={!formState.dirty || loading}
            />
          </p>
        </form>
      </FormContext>
      {loading && <p>Please wait...</p>}
      {data?.setUsername?.__typename === 'Result' && (
        <p className="msg-success">Username modified.</p>
      )}
    </Fragment>
  );
};

const ChangeEmailAddress = () => {
  const { register, handleSubmit } = useForm();

  const setEmailAddress = (formData: any) => {
    console.log('update username:', formData);
  };

  return (
    <form onSubmit={handleSubmit(setEmailAddress)}>
      <p>
        <input
          type="text"
          placeholder="Email address"
          name="enail_address"
          ref={register({
            required: true,
          })}
        />
      </p>
      <p>
        <input type="submit" value="Update" disabled={true} />{' '}
        <input type="submit" value="Delete" disabled={true} />
      </p>
    </form>
  );
};

const ChangePassword = () => {
  const { register, handleSubmit } = useForm();

  const setEmailAddress = (formData: any) => {
    console.log('update username:', formData);
  };

  return (
    <form onSubmit={handleSubmit(setEmailAddress)}>
      {/* <PasswordInput /> */}
      <p>
        <input type="submit" value="Update" disabled={true} />
      </p>
    </form>
  );
};

export default Settings;
