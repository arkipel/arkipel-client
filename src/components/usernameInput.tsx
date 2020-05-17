import React, { Fragment, useState, FunctionComponent, useEffect } from 'react';

import { useQuery, gql } from '@apollo/client';

const UsernameInput: FunctionComponent<{
  current?: string;
  disabled?: boolean;
  onUpdate?: (data: {
    username: string;
    dirty: boolean;
    valid: boolean;
  }) => void;
}> = ({ current, disabled, onUpdate }) => {
  const [username, setUsername] = useState(current || '');

  // Inputs
  let { usernameErrors } = check(username);

  useEffect(() => {
    if (onUpdate) {
      onUpdate({
        username,
        dirty: current !== username,
        valid: usernameErrors.length === 0,
      });
    }
  });

  return (
    <Fragment>
      <p>
        <input
          type="text"
          value={username}
          placeholder="Username"
          maxLength={20}
          disabled={disabled || false}
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
    </Fragment>
  );
};

const check = (username: string) => {
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

  if (username.length > 0 && usernameErrors.length === 0) {
    if (loading) {
      usernameErrors.push('checking availability...');
    } else if (data && !data.checkUsernameAvailability) {
      usernameErrors.push('already taken');
    }
  }

  // Allow subtmitting or not
  let allowSubmit = false;
  if (usernameErrors.length === 0) {
    allowSubmit = true;
  }

  return {
    usernameErrors,
  };
};

export default UsernameInput;
