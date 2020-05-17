import React, { Fragment, useState, FunctionComponent, useEffect } from 'react';

const PasswordInput: FunctionComponent<{
  disabled?: boolean;
  onUpdate?: (data: { password: string; valid: boolean }) => void;
}> = ({ disabled, onUpdate }) => {
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

  // Inputs
  let { passwordErrors, passwordAgainErrors } = check(password, passwordAgain);

  useEffect(() => {
    if (onUpdate) {
      onUpdate({
        password,
        valid: passwordErrors.length === 0 && passwordAgainErrors.length === 0,
      });
    }
  });

  return (
    <Fragment>
      <p>
        <input
          type="password"
          value={password}
          placeholder="Password"
          disabled={disabled || false}
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
          disabled={disabled || false}
          onChange={(event) => {
            setPasswordAgain(event.target.value);
          }}
        />
        {passwordAgainErrors.length > 0 && (
          <Fragment>
            <br />
            <span className="hint-error">{passwordAgainErrors.join(', ')}</span>
          </Fragment>
        )}
        <br />
        <span className="hint">same password</span>
      </p>
    </Fragment>
  );
};

const check = (password: string, passwordAgain: string) => {
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
  if (passwordErrors.length === 0 && passwordAgainErrors.length === 0) {
    allowSubmit = true;
  }

  return {
    passwordErrors,
    passwordAgainErrors,
    allowSubmit,
  };
};

export default PasswordInput;
