import React, { Fragment, FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';

import { gql, useApolloClient } from '@apollo/client';

const UsernameInput: FunctionComponent<Partial<props>> = ({ disabled }) => {
  const { register, errors } = useFormContext<{
    username: string;
  }>();

  const client = useApolloClient();

  let errorMsgs = Object.values(errors.username?.types || {}).join(', ');

  return (
    <Fragment>
      <p>
        <input
          type="text"
          name="username"
          placeholder="Username"
          maxLength={20}
          disabled={disabled || false}
          ref={register({
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
              if (username.length < 4) {
                return true;
              }

              try {
                let response = await client.query<
                  {
                    usernameAvailability: boolean;
                  },
                  { username: string }
                >({
                  query: gql`
                    query usernameAvailability($username: String!) {
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
            <span className="hint-error">{errorMsgs}</span>
          </Fragment>
        )}
        <br />
        <span className="hint">a-z, A-Z, 0-9, 4-20 characters</span>
      </p>
    </Fragment>
  );
};

class props {
  current: string = '';
  disabled: boolean = false;
}

export default UsernameInput;
