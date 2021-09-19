import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

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

import { HintError } from '../../ui/dialog/Hint';
import { Success, Error } from '../../ui/dialog/Msg';
import { Button } from '../../ui/form/Button';
import { Form } from '../../ui/form/Form';
import { Input, Submit } from '../../ui/form/Input';

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
        The owner of the address is considered the owner of this account. It is
        impossible to recover a lost password without an email address.
      </p>
      <h2>Password</h2>
      <ChangePassword />
      <h2>Delete account</h2>
      <p>
        There is currently no way to automatically delete your account, but that
        feature is definitely planned. To delete your account, send a request to{' '}
        <a href="mailto:support@arkipel.io">support@arkipel.io</a>. Your account
        must have a verified email address and you must use that address to make
        the request.
      </p>
      <p>
        There will be a way to automatically delete accounts in the future, but
        development time is spent on other features for now.
      </p>
    </Fragment>
  );
};

const ChangeUsernameForm = () => {
  const [updateSucceeded, setUpdateSuccess] = useState(false);
  const [updateFailed, setUpdateFailure] = useState(false);
  const [networkFailed, setNetworkFailure] = useState(false);

  const client = useApolloClient();
  const session = useContext(SessionContext);

  const formFunctions = useForm<{
    username: string;
  }>({
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: { username: session.username },
  });
  const { handleSubmit, formState, watch } = formFunctions;

  let username = watch('username');

  let different = username !== session.username;

  return (
    <Fragment>
      <FormProvider {...formFunctions}>
        <Form
          onSubmit={handleSubmit(async ({ username }) => {
            setUpdateSuccess(false);
            setUpdateFailure(false);
            setNetworkFailure(false);

            try {
              let response = await client.mutate<
                SetUsername,
                SetUsernameVariables
              >({
                mutation: gql`
                  mutation SetUsername($userId: String!, $username: String!) {
                    setUsername(userId: $userId, new: $username) {
                      __typename
                    }
                  }
                `,
                variables: { userId: session.id, username },
              });

              if (response?.data?.setUsername?.__typename === 'User') {
                session.update({ username });
                setUpdateSuccess(true);
              }
            } catch {
              setNetworkFailure(true);
            }
          })}
        >
          <UsernameInput current={session.username} />
          <p>
            <Submit
              value="Update"
              disabled={!formState.isValid || !different}
            />
          </p>
        </Form>
      </FormProvider>
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
        onConfirmation={() => setNetworkFailure(false)}
      >
        Request could not be sent, Errorlease try again later.{' '}
      </Error>
    </Fragment>
  );
};

const ChangeEmailAddress = () => {
  const [currentAddress, setCurrentAddress] = useState('');
  const [updateSucceeded, setUpdateSuccess] = useState(false);
  const [deleteSucceeded, setDeleteSuccess] = useState(false);
  const [alreadyUsed, setAlreadyUsed] = useState(false);
  const [updateFailed, setUpdateFailure] = useState(false);
  const [networkFailed, setNetworkFailure] = useState(false);

  const client = useApolloClient();
  const session = useContext(SessionContext);

  const { data, loading } = useQuery<GetEmailAddress, GetEmailAddressVariables>(
    gql`
      query GetEmailAddress($userId: String!) {
        me(userId: $userId) {
          __typename
          ... on User {
            id
            emailAddress
            emailAddressVerified
          }
        }
      }
    `,
    {
      variables: { userId: session.id },
    },
  );

  const formFunctions = useForm<{
    email_address: string;
  }>({
    mode: 'onChange',
    criteriaMode: 'all',
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

  let needsToBeVerified = false;
  let hasBeenVerified = false;
  if (data?.me?.__typename === 'User' && data.me.emailAddress) {
    needsToBeVerified = !data.me.emailAddressVerified;
    hasBeenVerified = data.me.emailAddressVerified;
  }

  return (
    <Fragment>
      <Form
        onSubmit={handleSubmit(async ({ email_address: emailAddress }) => {
          setUpdateSuccess(false);
          setUpdateFailure(false);
          setDeleteSuccess(false);
          setNetworkFailure(false);

          try {
            let response = await client.mutate<
              SetEmailAddress,
              SetEmailAddressVariables
            >({
              mutation: gql`
                mutation SetEmailAddress(
                  $userId: String!
                  $emailAddress: String!
                ) {
                  setEmailAddress(userId: $userId, new: $emailAddress) {
                    __typename
                    ... on User {
                      id
                      emailAddress
                      emailAddressVerified
                    }
                  }
                }
              `,
              variables: { userId: session.id, emailAddress },
            });

            if (response?.data?.setEmailAddress?.__typename === 'User') {
              setUpdateSuccess(true);
            } else if (
              response?.data?.setEmailAddress?.__typename === 'AlreadyExists'
            ) {
              setAlreadyUsed(true);
            }
          } catch (err) {
            setNetworkFailure(true);
          }
        })}
      >
        <p>
          <Input
            type="email"
            placeholder={loading ? 'Loading...' : 'Email address'}
            {...register('email_address', {
              required: true,
              minLength: 5,
            })}
          />
        </p>
        <p>
          <Submit
            value="Update"
            disabled={!formState.isDirty || !formState.isValid}
          />{' '}
          <Button
            type="button"
            disabled={!currentAddress}
            onClick={async () => {
              try {
                let response = await client.mutate<
                  DeleteEmailAddress,
                  DeleteEmailAddressVariables
                >({
                  mutation: gql`
                    mutation DeleteEmailAddress($userId: String!) {
                      deleteEmailAddress(userId: $userId) {
                        __typename
                        ... on User {
                          id
                          emailAddress
                        }
                      }
                    }
                  `,
                  variables: { userId: session.id },
                });

                if (response?.data?.deleteEmailAddress?.__typename === 'User') {
                  setDeleteSuccess(true);
                }
              } catch (err) {
                setNetworkFailure(true);
              }
            }}
          >
            Delete
          </Button>
        </p>
      </Form>
      <Error visible={needsToBeVerified}>Email address not verified.</Error>
      <Success visible={hasBeenVerified}>Email address verified.</Success>
      <Success
        visible={updateSucceeded}
        onConfirmation={() => setUpdateSuccess(false)}
      >
        An email has been sent to verify your email address.
      </Success>
      <Success
        visible={deleteSucceeded}
        onConfirmation={() => setDeleteSuccess(false)}
      >
        The email address has been deleted.
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
        onConfirmation={() => setNetworkFailure(false)}
      >
        Request could not be sent, please try again later.
      </Error>
    </Fragment>
  );
};

const ChangePassword = () => {
  const [updateSucceeded, setUpdateSuccess] = useState(false);
  const [updateFailed, setUpdateFailure] = useState(false);
  const [networkFailed, setNetworkFailure] = useState(false);

  const client = useApolloClient();
  const session = useContext(SessionContext);

  const formFunctions = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  });
  const { handleSubmit, register, formState, watch } = formFunctions;
  const errors = formState.errors;

  const currentPassword = watch('current_password');

  const setPassword = async (formData: any) => {
    try {
      let response = await client.mutate<SetPassword, SetPasswordVariables>({
        mutation: gql`
          mutation SetPassword($userId: String!, $old: String!, $new: String!) {
            setPassword(userId: $userId, old: $old, new: $new) {
              __typename
            }
          }
        `,
        variables: {
          userId: session.id,
          old: formData.current_password,
          new: formData.password,
        },
      });

      if (response?.data?.setPassword?.__typename === 'User') {
        setUpdateSuccess(true);
      }
    } catch (err) {
      setNetworkFailure(true);
    }
  };

  let errorMsgs = Object.values(errors.current_password?.types || {}).join(
    ', ',
  );

  return (
    <FormProvider {...formFunctions}>
      <Form onSubmit={handleSubmit(setPassword)}>
        <PasswordInput disabled={false} />
        <p>
          <Input
            type="password"
            placeholder="Current password"
            {...register('current_password', {
              required: {
                value: true,
                message: 'required',
              },
            })}
          />
          {errorMsgs && (
            <Fragment>
              <br />
              <HintError>{errorMsgs}</HintError>
            </Fragment>
          )}
        </p>
        <p>
          <Submit
            value="Update"
            disabled={!formState.isValid || currentPassword === ''}
          />
        </p>
      </Form>
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
        onConfirmation={() => setNetworkFailure(false)}
      >
        Request could not be sent, please try again later.
      </Error>
    </FormProvider>
  );
};

export default Settings;
