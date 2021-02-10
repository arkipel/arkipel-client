import React, { FunctionComponent } from 'react';

import style from './Button.scss';

const Button: FunctionComponent<{
  enabled: boolean;
  onClick: () => void;
}> = ({ children, enabled, onClick }) => {
  return (
    <button className={style.btn} disabled={!enabled} onClick={onClick}>
      {children}
    </button>
  );
};

const Submit: FunctionComponent<{
  text: string;
  enabled: boolean;
}> = ({ text, enabled }) => {
  return (
    <input
      className={style.btn}
      type="submit"
      value={text}
      disabled={!enabled}
    />
  );
};

export { Button, Submit };
