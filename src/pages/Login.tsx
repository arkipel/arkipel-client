import React, { Fragment, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useLazyQuery, gql } from '@apollo/client';

import { SessionContext } from '../libs/session/session';

const Login = () => {
  // Router
  let history = useHistory();

  // Form
  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
    validateCriteriaMode: 'all',
  });

  let allowSubmit = formState.isValid;

  const [getToken, { data, loading }] = useLazyQuery(
    gql`
      query login($username: String!, $password: String!) {
        sessionToken(username: $username, password: $password)
      }
    `,
    { fetchPolicy: 'network-only' },
  );

  const submit = (formData: any) => {
    getToken({
      variables: {
        username: formData.username,
        password: formData.password,
      },
    });
  };

  if (loading) {
    allowSubmit = false;
  }

  const sessionContext = useContext(SessionContext);

  useEffect(() => {
    if (data && data.sessionToken !== '') {
      sessionContext.logIn(data.sessionToken);

      // Redirect
      history.push('/');
    }
  });

  return (
    <Fragment>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(submit)}>
        <p>
          <input
            type="text"
            placeholder="Username"
            name="username"
            defaultValue="master"
            ref={register({
              required: true,
            })}
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Password"
            name="password"
            defaultValue="master"
            ref={register({
              required: true,
            })}
          />
        </p>
        <p>
          <input type="submit" value="Log in" disabled={!allowSubmit} />
        </p>
      </form>
      {loading && <p>Logging in...</p>}
      {data && data.sessionToken === '' && (
        <p className="msg-error">Login failed, wrong credentials.</p>
      )}
    </Fragment>
  );
};

export default Login;
