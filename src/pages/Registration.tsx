import React, { Fragment, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { gql, useMutation } from '@apollo/client';
import { Register, RegisterVariables } from '../generated/Register';

import HCaptcha from '@hcaptcha/react-hcaptcha';

import UsernameInput from '../components/usernameInput';
import PasswordInput from '../components/passwordInput';

import { Info, Success, Error } from '../ui/dialog/Msg';

const Registration = () => {
  // const [username, setUsername] = useState('');
  // const [usernameIsValid, setUsernameIsValid] = useState(false);
  // const [password, setPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [captcha, setCaptcha] = useState('');

  const formFunctions = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  });
  const { formState } = formFunctions;

  let allowSubmit = true;
  if (!formState.isValid) {
    allowSubmit = false;
  } else if (captcha === '') {
    allowSubmit = false;
  }

  // Form submission
  let [submit, { loading, data }] = useMutation<Register, RegisterVariables>(
    gql`
      mutation Register(
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
          ... on AlreadyExists {
            identifier
          }
        }
      }
    `,
  );

  let registered = false;
  if (data) {
    if (data.register.__typename === 'User') {
      registered = true;
      allowSubmit = false;
    }
  }

  return (
    <Fragment>
      <h1>Register</h1>
      <Error>
        This game is still a work in progress. You should expect bugs and an
        incomplete gameplay.
      </Error>
      <FormProvider {...formFunctions}>
        <form
          onSubmit={formFunctions.handleSubmit((formData) => {
            submit({
              variables: {
                username: formData.username,
                password: formData.password,
                captcha,
              },
            });
          })}
        >
          <UsernameInput disabled={registered} />
          <PasswordInput disabled={registered} />
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
              disabled={!allowSubmit || loading}
            />
          </p>
        </form>
      </FormProvider>
      <Info visible={loading}>Please wait...</Info>
      <Success visible={data !== null && data?.register?.__typename === 'User'}>
        The registration succeeded. You may now log in.
      </Success>
    </Fragment>
  );
};

export default Registration;
