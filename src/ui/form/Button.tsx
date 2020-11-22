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

// const style = {
//   padding: '6px',
//   color: '#ffffff',
//   fontSize: '18px',
//   border: 'none',
//   //   background: 'rgb(40, 40, 40)',
//   ':disabled': {
//     background: rgb(120, 120, 120),
//   },
// };

export { Button, Submit };
