import React, { Fragment, FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';

import { gql, useApolloClient } from '@apollo/client';
import {
  GetUsernameAvailability,
  GetUsernameAvailabilityVariables,
} from '../generated/GetUsernameAvailability';

import { HintInfo, HintError } from '../ui/dialog/Hint';
import { Input } from '../ui/form/Input';

const UsernameInput: FunctionComponent<Partial<props>> = ({
  current,
  disabled,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{
    username: string;
  }>();

  const client = useApolloClient();

  let errorMsgs = Object.values(errors.username?.types || {}).join(', ');

  return (
    <Fragment>
      <p>
        <Input
          type="text"
          placeholder="Username"
          maxLength={20}
          disabled={disabled || false}
          {...register('username', {
            required: {
              value: true,
              message: 'required',
            },
            minLength: {
              value: 4,
              message: 'too short',
            },
            maxLength: {
              value: 20,
              message: 'too long',
            },
            pattern: {
              value: /^[a-zA-Z0-9]+$/,
              message: 'invalid characters',
            },
            validate: async (username: string): Promise<string | boolean> => {
              if (!username) {
                return true;
              }

              if (username.length < 4) {
                return true;
              }

              if (username === current) {
                return true;
              }

              try {
                let response = await client.query<
                  GetUsernameAvailability,
                  GetUsernameAvailabilityVariables
                >({
                  query: gql`
                    query GetUsernameAvailability($username: String!) {
                      usernameAvailability(username: $username)
                    }
                  `,
                  variables: { username },
                });

                if (!response.data?.usernameAvailability) {
                  return 'already taken';
                }

                return true;
              } catch (err) {
                return 'could not check availability';
              }
            },
          })}
        />
        {errorMsgs && (
          <Fragment>
            <br />
            <HintError>{errorMsgs}</HintError>
          </Fragment>
        )}
        <br />
        <HintInfo>a-z, A-Z, 0-9, 4-20 characters</HintInfo>
      </p>
    </Fragment>
  );
};

class props {
  current: string = '';
  disabled: boolean = false;
}

export default UsernameInput;
