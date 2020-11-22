import React, { Fragment, FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';

import { HintInfo, HintError } from '../ui/dialog/Hint';

const PasswordInput: FunctionComponent<props> = ({ disabled }) => {
  const { register, errors, watch, trigger } = useFormContext();

  let errorMsgs = Object.values(errors.password?.types || {}).join(', ');
  let errorMsgsAg = Object.values(errors.passwordAgain?.types || {}).join(', ');

  return (
    <Fragment>
      <p>
        <input
          type="password"
          name="password"
          placeholder="Password"
          disabled={disabled || false}
          onChange={() => trigger('passwordAgain')}
          ref={register({
            required: {
              value: true,
              message: 'required',
            },
            minLength: {
              value: 8,
              message: 'too short',
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
        <HintInfo>at least 8 characters</HintInfo>
      </p>
      <p>
        <input
          type="password"
          name="passwordAgain"
          placeholder="Password again"
          disabled={disabled || false}
          ref={register({
            validate: {
              same: (passwordAgain: string) => {
                const password = watch('password');
                if (passwordAgain !== '') {
                  if (passwordAgain !== password) {
                    return 'not the same';
                  }
                }
                return true;
              },
            },
          })}
        />
        {errorMsgsAg && (
          <Fragment>
            <br />
            <HintError>{errorMsgsAg}</HintError>
          </Fragment>
        )}
        <br />
        <HintInfo>same password</HintInfo>
      </p>
    </Fragment>
  );
};

class props {
  disabled: boolean = false;
}

export default PasswordInput;
