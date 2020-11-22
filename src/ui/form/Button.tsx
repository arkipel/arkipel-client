import React, { FunctionComponent } from 'react';

import style from './Button.scss';

const Button: FunctionComponent<props> = ({ children, enabled }) => {
  return (
    <button className={style.btn} disabled={!enabled}>
      {children}
    </button>
  );
};

const Submit: FunctionComponent<props> = ({ text, enabled }) => {
  return (
    <input
      className={style.btn}
      type="submit"
      value={text}
      disabled={!enabled}
    />
  );
};

class props {
  text: string = 'Click';
  enabled: boolean = true;
}

export { Button, Submit };
