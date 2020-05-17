import React, { Fragment, useState } from 'react';

import { gql, useMutation } from '@apollo/client';

import HCaptcha from '@hcaptcha/react-hcaptcha';

import UsernameInput from '../components/usernameInput';
import PasswordInput from '../components/passwordInput';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [captcha, setCaptcha] = useState('');

  let allowSubmit = true;
  if (!usernameIsValid || !passwordIsValid || captcha === '') {
    allowSubmit = false;
  }

  // Form submission
  let [
    submit,
    { loading: registrationLoading, data: registrationResult },
  ] = useMutation(
    gql`
      mutation register(
        $username: String!
        $password: String!
        $captcha: String!
      ) {
        register(username: $username, password: $password, captcha: $captcha) {
          __typename
          ... on User {
            id
            username
          }
          ... on UsernameAlreadyTaken {
            username
          }
        }
      }
    `,
  );

  let registered = false;
  if (registrationResult) {
    if (registrationResult.register.__typename === 'User') {
      registered = true;
      allowSubmit = false;
    }
  }

  return (
    <Fragment>
      <h1>Register</h1>
      <p className="msg-error">
        This game is still a work in progress. You should expect bugs and an
        incomplete gameplay.
      </p>
      <form
        onSubmit={(ev: React.FormEvent<HTMLFormElement>) => {
          ev.preventDefault();

          submit({ variables: { username, password, captcha } });
        }}
      >
        <UsernameInput
          disabled={registered}
          onUpdate={({ username, valid }) => {
            setUsername(username);
            setUsernameIsValid(valid);
          }}
        />
        <PasswordInput
          disabled={registered}
          onUpdate={({ password, valid }) => {
            setPassword(password);
            setPasswordIsValid(valid);
          }}
        />
        <HCaptcha
          // sitekey="10000000-ffff-ffff-ffff-000000000001"
          sitekey="36cde9f3-38a3-4fd7-9314-bac28f55545b"
          onVerify={(c: string) => {
            setCaptcha(c);
          }}
          onExpire={() => {
            setCaptcha('');
          }}
        ></HCaptcha>
        <p>
          <input
            type="submit"
            value="Register"
            disabled={!allowSubmit || registrationLoading}
          />
        </p>
      </form>
      {registrationLoading && <p>Please wait...</p>}
      {registrationResult &&
        registrationResult.register.__typename === 'User' && (
          <p className="msg-success">
            The registration succeeded. You may now log in.
          </p>
        )}
    </Fragment>
  );
};

export default Registration;
