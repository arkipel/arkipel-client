import React, { Fragment, FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';

const PasswordInput: FunctionComponent<props> = ({ disabled }) => {
  const { register, errors, watch, triggerValidation } = useFormContext();

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
          onChange={() => triggerValidation('passwordAgain')}
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
            <span className="hint-error">{errorMsgs}</span>
          </Fragment>
        )}
        <br />
        <span className="hint">at least 8 characters</span>
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
            <span className="hint-error">{errorMsgsAg}</span>
          </Fragment>
        )}
        <br />
        <span className="hint">same password</span>
      </p>
    </Fragment>
  );
};

class props {
  disabled: boolean = false;
}

export default PasswordInput;
