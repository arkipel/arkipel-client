import React, { Fragment, useState } from 'react';

import { gql, useMutation } from '@apollo/client';

import HCaptcha from '@hcaptcha/react-hcaptcha';

import UsernameForm from '../components/usernameForm';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [captcha, setCaptcha] = useState('');

  // Inputs
  let { passwordErrors, passwordAgainErrors, allowSubmit } = checkInputs(
    password,
    passwordAgain,
  );

  if (captcha === '') {
    allowSubmit = false;
  }

  if (!usernameIsValid) {
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
        <UsernameForm
          disabled={registered}
          onUpdate={({ username, valid }) => {
            setUsername(username);
            setUsernameIsValid(valid);
          }}
        />
        <p>
          <input
            type="password"
            value={password}
            placeholder="Password"
            disabled={registered}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          {passwordErrors.length > 0 && (
            <Fragment>
              <br />
              <span className="hint-error">{passwordErrors.join(', ')}</span>
            </Fragment>
          )}
          <br />
          <span className="hint">at least 8 characters</span>
        </p>
        <p>
          <input
            type="password"
            value={passwordAgain}
            placeholder="Password again"
            disabled={registered}
            onChange={(event) => {
              setPasswordAgain(event.target.value);
            }}
          />
          {passwordAgainErrors.length > 0 && (
            <Fragment>
              <br />
              <span className="hint-error">
                {passwordAgainErrors.join(', ')}
              </span>
            </Fragment>
          )}
          <br />
          <span className="hint">same password</span>
        </p>
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

const checkInputs = (password: string, passwordAgain: string) => {
  // Check password
  let passwordErrors = new Array<string>();
  if (password.length > 0 && password.length < 8) {
    passwordErrors.push('too short');
    passwordErrors.push('too short');
  }

  let passwordAgainErrors = new Array<string>();
  if (passwordAgain.length > 0 && passwordAgain !== password) {
    passwordAgainErrors.push('not the same');
  }

  // Allow subtmitting or not
  let allowSubmit = false;
  if (passwordErrors.length === 0 && passwordAgainErrors.length === 0) {
    allowSubmit = true;
  }

  return {
    passwordErrors,
    passwordAgainErrors,
    allowSubmit,
  };
};

export default Registration;
