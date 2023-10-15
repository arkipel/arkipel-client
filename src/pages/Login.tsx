import React, { Fragment, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { SessionContext } from '../libs/session/session';

import { Error } from '../ui/dialog/Msg';
import { Form } from '../ui/form/Form';
import { Input, Submit } from '../ui/form/Input';

const Login = () => {
  const [loginFailed, setLoginFailure] = useState(false);
  const [networkFailed, setNetworkailure] = useState(false);

  // Router
  let navigate = useNavigate();

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
      navigate('/');
    } else {
      setLoginFailure(true);
    }
  };

  return (
    <Fragment>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit(submit)}>
        <p>
          <Input
            type="text"
            placeholder="Username"
            {...register('username', {
              required: true,
            })}
          />
        </p>
        <p>
          <Input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: true,
            })}
          />
        </p>
        <p>
          <Submit value="Log in" disabled={!allowSubmit} />
        </p>
      </Form>
      <Error visible={loginFailed}>Login failed, wrong credentials.</Error>
      <Error visible={networkFailed}>
        Request failed, please try again later.
      </Error>
    </Fragment>
  );
};

export default Login;
