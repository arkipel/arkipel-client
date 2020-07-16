import React, { Fragment, FunctionComponent, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { gql, useMutation } from '@apollo/client';
import { Register, RegisterVariables } from '../generated/Register';

import HCaptcha from '@hcaptcha/react-hcaptcha';

import UsernameInput from '../components/usernameInput';
import PasswordInput from '../components/passwordInput';

import { Info, Success, Error } from '../ui/dialog/Msg';

import styles from './Actions.scss';

const TileActions: FunctionComponent<props> = ({ islandId, position }) => {
  // const [captcha, setCaptcha] = useState('');

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

  // Get tile owner
  let [submit, { loading, data }] = useMutation(
    gql`
      mutation getTileOwner($islandID: String!, $position: String!) {
        getTile(islandID: $islandID, position: $position) {
          __typename
          ... on Tile {
            owner {
              id
            }
          }
        }
      }
    `,
  );

  return (
    <Fragment>
      <h3>Actions</h3>
      <FormProvider {...formFunctions}>
        <form
          onSubmit={formFunctions.handleSubmit((formData) => {
            submit({
              variables: {
                username: formData.username,
                password: formData.password,
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
    </Fragment>
  );
};

class props {
  islandId: string = '';
  position: number = 0;
}

export default TileActions;
