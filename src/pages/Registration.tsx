import React, { Fragment, useState } from 'react';

import { useQuery, gql, useMutation } from '@apollo/client';

import { debounce } from 'lodash';

import HCaptcha from '@hcaptcha/react-hcaptcha';

const Registration = () => {
  const [username, setUsername] = useState('testusername');
  const [password, setPassword] = useState('testpassword');
  const [passwordAgain, setPasswordAgain] = useState('testpassword');
  const [captcha, setCaptcha] = useState('');

  // Inputs
  let {
    usernameErrors,
    passwordErrors,
    passwordAgainErrors,
    allowSubmit,
  } = checkInputs(username, password, passwordAgain);

  if (captcha === '') {
    allowSubmit = false;
  }

  // Form submission
  let [submit, { data }] = useMutation(
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

          let result = submit({ variables: { username, password, captcha } });
          if (!result) {
            console.log('Regristration failed... :(');
          } else {
            console.log('Registration succeeded! :D');
          }
        }}
      >
        <p>
          <input
            type="text"
            value={username}
            placeholder="Username"
            maxLength={20}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          {usernameErrors.length > 0 && (
            <Fragment>
              <br />
              <span className="hint-error">{usernameErrors.join(', ')}</span>
            </Fragment>
          )}
          <br />
          <span className="hint">a-z, A-Z, 0-9, 4-20 characters</span>
        </p>
        <p>
          <input
            type="password"
            value={password}
            placeholder="Password"
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
          sitekey="10000000-ffff-ffff-ffff-000000000001"
          // sitekey="36cde9f3-38a3-4fd7-9314-bac28f55545b"
          onVerify={(c: any) => {
            setCaptcha(c);
          }}
          onExpire={() => {
            setCaptcha('');
          }}
        ></HCaptcha>
        <p>
          <input type="submit" value="Register" disabled={!allowSubmit} />
        </p>
      </form>
    </Fragment>
  );
};

const checkInputs = (
  username: string,
  password: string,
  passwordAgain: string,
) => {
  // Check username
  let usernameErrors = new Array<string>();
  if (username.length > 0 && username.length < 4) {
    usernameErrors.push('too short');
  } else if (username.length > 20) {
    usernameErrors.push('too long');
  }
  if (username.match(/[^a-zA-Z0-9]+/)) {
    usernameErrors.push('invalid characters');
  }

  // Check username availability
  let { data, loading } = useQuery(
    gql`
      query checkUsernameAvailability($username: String!) {
        checkUsernameAvailability(username: $username)
      }
    `,
    { variables: { username }, skip: usernameErrors.length > 0 },
  );

  if (usernameErrors.length === 0) {
    if (loading) {
      usernameErrors.push('checking availability...');
    } else if (data && !data.checkUsernameAvailability) {
      usernameErrors.push('already taken');
    }
  }

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
  if (
    usernameErrors.length === 0 &&
    passwordErrors.length === 0 &&
    passwordAgainErrors.length === 0
  ) {
    allowSubmit = true;
  }

  return {
    usernameErrors,
    passwordErrors,
    passwordAgainErrors,
    allowSubmit,
  };
};

const submit = (username: string, password: string, captcha: string) => {
  submit({ variables: { username, password, captcha } });

  if (error) {
    return false;
  }

  if (data) {
    if (data.__typename === 'UsernameAlreadyExists') {
      console.log('dude,', username, 'is already taken, sorry');
      return false;
    }
  }

  return true;
};

export default Registration;
