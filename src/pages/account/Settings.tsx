import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, FormContext } from 'react-hook-form';

import { gql, useApolloClient, useQuery } from '@apollo/client';
import { SetUsername, SetUsernameVariables } from 'generated/SetUsername';
import {
  GetEmailAddress,
  GetEmailAddressVariables,
} from 'generated/GetEmailAddress';
import {
  SetEmailAddress,
  SetEmailAddressVariables,
} from 'generated/SetEmailAddress';
import {
  DeleteEmailAddress,
  DeleteEmailAddressVariables,
} from '../../generated/DeleteEmailAddress';
import { SetPassword, SetPasswordVariables } from '../../generated/SetPassword';

import { SessionContext } from '../../libs/session/session';

import UsernameInput from '../../components/usernameInput';
import PasswordInput from '../../components/passwordInput';

import { Success, Error } from '../../ui/dialog/Msg';

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
      <p>
        There is currently no verification. Make sure the address is correct.
        The owner of the address is considered the owner of this account.
      </p>
      <p>
        It is impossible to recover a lost password without an email address.
      </p>
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
  const [updateSucceeded, setUpdateSuccess] = useState(false);
  const [updateFailed, setUpdateFailure] = useState(false);
  const [networkFailed, setNetworkailure] = useState(false);

  const client = useApolloClient();
  const session = useContext(SessionContext);

  const formFunctions = useForm<{
    username: string;
  }>({
    mode: 'onChange',
    validateCriteriaMode: 'all',
    defaultValues: { username: session.username },
  });
  const { handleSubmit, formState, watch } = formFunctions;

  let username = watch('username');

  let different = username !== session.username;

  return (
    <Fragment>
      <FormContext {...formFunctions}>
        <form
          onSubmit={handleSubmit(async ({ username }) => {
            setUpdateSuccess(false);
            setUpdateFailure(false);
            setNetworkailure(false);

            try {
              let response = await client.mutate<
                SetUsername,
                SetUsernameVariables
              >({
                mutation: gql`
                  mutation SetUsername($userID: String!, $username: String!) {
                    setUsername(userID: $userID, new: $username) {
                      __typename
                    }
                  }
                `,
                variables: { userID: session.id, username },
              });

              if (response?.data?.setUsername?.__typename === 'User') {
                session.update({ username });
                setUpdateSuccess(true);
              }
            } catch {
              setNetworkailure(true);
            }
          })}
        >
          <UsernameInput current={session.username} />
          <p>
            <input
              type="submit"
              value="Update"
              disabled={!formState.isValid || !different}
            />
          </p>
        </form>
      </FormContext>
      <Success
        visible={updateSucceeded}
        onConfirmation={() => setUpdateSuccess(false)}
      >
        Your username has been updated.{' '}
      </Success>
      <Error visible={updateFailed}>
        Something went wrong, please try again.
      </Error>
      <Error
        visible={networkFailed}
        onConfirmation={() => setNetworkailure(false)}
      >
        Request could not be sent, Errorlease try again later.{' '}
      </Error>
    </Fragment>
  );
};

const ChangeEmailAddress = () => {
  const [currentAddress, setCurrentAddress] = useState('');
  const [updateSucceeded, setUpdateSuccess] = useState(false);
  const [alreadyUsed, setAlreadyUsed] = useState(false);
  const [updateFailed, setUpdateFailure] = useState(false);
  const [networkFailed, setNetworkailure] = useState(false);

  const client = useApolloClient();
  const session = useContext(SessionContext);

  const { data, loading } = useQuery<GetEmailAddress, GetEmailAddressVariables>(
    gql`
      query GetEmailAddress($userID: String!) {
        me(userID: $userID) {
          __typename
          ... on User {
            id
            emailAddress
          }
        }
      }
    `,
    {
      variables: { userID: session.id },
    },
  );

  const formFunctions = useForm<{
    email_address: string;
  }>({
    mode: 'onChange',
    validateCriteriaMode: 'all',
    defaultValues: { email_address: '' },
  });

  useEffect(() => {
    if (
      data?.me?.__typename === 'User' &&
      data?.me?.emailAddress !== currentAddress
    ) {
      formFunctions.reset({ email_address: data.me.emailAddress || '' });
      setCurrentAddress(data.me.emailAddress || '');
    }
  }, [data]);

  const { handleSubmit, formState, register } = formFunctions;

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(async ({ email_address: emailAddress }) => {
          setUpdateSuccess(false);
          setUpdateFailure(false);
          setNetworkailure(false);

          try {
            let response = await client.mutate<
              SetEmailAddress,
              SetEmailAddressVariables
            >({
              mutation: gql`
                mutation SetEmailAddress(
                  $userID: String!
                  $emailAddress: String!
                ) {
                  setEmailAddress(userID: $userID, new: $emailAddress) {
                    __typename
                    ... on User {
                      id
                      emailAddress
                    }
                  }
                }
              `,
              variables: { userID: session.id, emailAddress },
            });

            if (response?.data?.setEmailAddress?.__typename === 'User') {
              setUpdateSuccess(true);
            } else if (
              response?.data?.setEmailAddress?.__typename === 'AlreadyExists'
            ) {
              setAlreadyUsed(true);
            }
          } catch (err) {
            setNetworkailure(true);
          }
        })}
      >
        <p>
          <input
            type="email"
            placeholder={loading ? 'Loading...' : 'Email address'}
            name="email_address"
            ref={register({
              required: true,
              minLength: 5,
            })}
          />
        </p>
        <p>
          <input
            type="submit"
            value="Update"
            disabled={!formState.dirty || !formState.isValid}
          />{' '}
          <input
            type="button"
            value="Delete"
            disabled={!currentAddress}
            onClick={async () => {
              try {
                let response = await client.mutate<
                  DeleteEmailAddress,
                  DeleteEmailAddressVariables
                >({
                  mutation: gql`
                    mutation DeleteEmailAddress($userID: String!) {
                      deleteEmailAddress(userID: $userID) {
                        __typename
                        ... on User {
                          id
                          emailAddress
                        }
                      }
                    }
                  `,
                  variables: { userID: session.id },
                });

                if (response?.data?.deleteEmailAddress?.__typename === 'User') {
                  setUpdateSuccess(true);
                }
              } catch (err) {
                setNetworkailure(true);
              }
            }}
          />
        </p>
      </form>
      <Success
        visible={updateSucceeded}
        onConfirmation={() => setUpdateSuccess(false)}
      >
        Your email address has been updated.
      </Success>
      <Error visible={alreadyUsed} onConfirmation={() => setAlreadyUsed(false)}>
        Sorry, that email address is already used.
      </Error>
      <Error
        visible={updateFailed}
        onConfirmation={() => setUpdateFailure(false)}
      >
        Something went wrong, please try again.
      </Error>
      <Error
        visible={networkFailed}
        onConfirmation={() => setNetworkailure(false)}
      >
        Request could not be sent, please try again later.
      </Error>
    </Fragment>
  );
};

const ChangePassword = () => {
  const [updateSucceeded, setUpdateSuccess] = useState(false);
  const [updateFailed, setUpdateFailure] = useState(false);
  const [networkFailed, setNetworkailure] = useState(false);

  const client = useApolloClient();
  const session = useContext(SessionContext);

  const formFunctions = useForm({
    mode: 'onChange',
    validateCriteriaMode: 'all',
  });
  const { handleSubmit, register, formState, watch, errors } = formFunctions;

  const currentPassword = watch('current_password');

  const setPassword = async (formData: any) => {
    try {
      let response = await client.mutate<SetPassword, SetPasswordVariables>({
        mutation: gql`
          mutation SetPassword($userID: String!, $old: String!, $new: String!) {
            setPassword(userID: $userID, old: $old, new: $new) {
              __typename
            }
          }
        `,
        variables: {
          userID: session.id,
          old: formData.current_password,
          new: formData.password,
        },
      });

      if (response?.data?.setPassword?.__typename === 'User') {
        setUpdateSuccess(true);
      }
    } catch (err) {
      setNetworkailure(true);
    }
  };

  let errorMsgs = Object.values(errors.current_password?.types || {}).join(
    ', ',
  );

  return (
    <FormContext {...formFunctions}>
      <form onSubmit={handleSubmit(setPassword)}>
        <PasswordInput disabled={false} />
        <p>
          <input
            type="password"
            name="current_password"
            placeholder="Current password"
            ref={register({
              required: {
                value: true,
                message: 'required',
              },
            })}
          />
          {errorMsgs && (
            <Fragment>
              <br />
              <span className="hint-error">{errorMsgs}</span>
            </Fragment>
          )}
        </p>
        <p>
          <input
            type="submit"
            value="Update"
            disabled={!formState.isValid || currentPassword === ''}
          />
        </p>
      </form>
      <Success
        visible={updateSucceeded}
        onConfirmation={() => setUpdateSuccess(false)}
      >
        Your password has been updated.
      </Success>
      <Error
        visible={updateFailed}
        onConfirmation={() => setUpdateFailure(false)}
      >
        Something went wrong, please try again.
      </Error>
      <Error
        visible={networkFailed}
        onConfirmation={() => setNetworkailure(false)}
      >
        Request could not be sent, please try again later.
      </Error>
    </FormContext>
  );
};

export default Settings;
