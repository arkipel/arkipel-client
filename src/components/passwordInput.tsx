import React, { Fragment, FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';

import { HintInfo, HintError } from '../ui/dialog/Hint';

const PasswordInput: FunctionComponent<props> = ({ disabled }) => {
  const {
    register,
    formState: { errors },
    watch,
    trigger,
  } = useFormContext();

  let errorMsgs = Object.values(errors.password?.types || {}).join(', ');
  let errorMsgsAg = Object.values(errors.passwordAgain?.types || {}).join(', ');

  const passwordParams = register('password', {
    required: {
      value: true,
      message: 'required',
    },
    minLength: {
      value: 8,
      message: 'too short',
    },
  });

  return (
    <Fragment>
      <p>
        <input
          type="password"
          placeholder="Password"
          disabled={disabled || false}
          name={passwordParams.name}
          ref={passwordParams.ref}
          onChange={(e) => {
            passwordParams.onChange(e);
            trigger('passwordAgain');
          }}
          onBlur={passwordParams.onBlur}
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
          placeholder="Password again"
          disabled={disabled || false}
          {...register('passwordAgain', {
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
