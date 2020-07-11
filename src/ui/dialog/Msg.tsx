import React, { FunctionComponent } from 'react';

import styles from './Msg.scss';

const Info: FunctionComponent<props> = ({
  children,
  visible = true,
  onConfirmation,
}) => {
  return (
    <Msg kind="info" visible={visible} onConfirmation={onConfirmation}>
      {children}
    </Msg>
  );
};

const Success: FunctionComponent<props> = ({
  children,
  visible = true,
  onConfirmation,
}) => {
  return (
    <Msg kind="success" visible={visible} onConfirmation={onConfirmation}>
      {children}
    </Msg>
  );
};

const Error: FunctionComponent<props> = ({
  children,
  visible = true,
  onConfirmation,
}) => {
  return (
    <Msg kind="error" visible={visible} onConfirmation={onConfirmation}>
      {children}
    </Msg>
  );
};

const Msg: FunctionComponent<props> = ({
  children,
  kind,
  visible = true,
  onConfirmation,
}) => {
  if (!visible) {
    return <></>;
  }

  let OK = <></>;
  if (onConfirmation) {
    OK = <a onClick={onConfirmation}>OK</a>;
  }

  return (
    <p className={styles[kind || 'info']}>
      <>
        {children}
        {OK}
      </>
    </p>
  );
};

class props {
  kind?: 'info' | 'success' | 'error' = 'info';
  visible?: boolean = true;
  onConfirmation?: () => void;
}

export { Info, Success, Error };
