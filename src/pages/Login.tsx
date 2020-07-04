import React, { Fragment, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { SessionContext } from '../libs/session/session';

const Login = () => {
  const [loginFailed, setLoginFailure] = useState(false);
  const [networkFailed, setNetworkailure] = useState(false);

  // Router
  let history = useHistory();

  // Form
  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  let allowSubmit = formState.isValid;

  const session = useContext(SessionContext);

  const submit = async (formData: any) => {
    setLoginFailure(false);
    setNetworkailure(false);

    let success = false;
    try {
      success = await session.logIn(formData.username, formData.password);
    } catch (err) {
      setNetworkailure(true);
      return;
    }

    if (success) {
      // Redirect
      history.push('/');
    } else {
      setLoginFailure(true);
    }
  };

  return (
    <Fragment>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(submit)}>
        <p>
          <input
            type="text"
            placeholder="Username"
            name="username"
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
            ref={register({
              required: true,
            })}
          />
        </p>
        <p>
          <input type="submit" value="Log in" disabled={!allowSubmit} />
        </p>
      </form>
      {loginFailed && (
        <p className="msg-error">Login failed, wrong credentials.</p>
      )}
      {networkFailed && (
        <p className="msg-error">Request failed, please try again later.</p>
      )}
    </Fragment>
  );
};

export default Login;
