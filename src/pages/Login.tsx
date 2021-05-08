import React, { Fragment, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { SessionContext } from '../libs/session/session';

import { Error } from '../ui/dialog/Msg';
import { Submit } from '../ui/form/Button';

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
            {...register('username', {
              required: true,
            })}
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: true,
            })}
          />
        </p>
        <p>
          <Submit text="Log in" enabled={allowSubmit} />
        </p>
      </form>
      <Error visible={loginFailed}>Login failed, wrong credentials.</Error>
      <Error visible={networkFailed}>
        Request failed, please try again later.
      </Error>
    </Fragment>
  );
};

export default Login;
