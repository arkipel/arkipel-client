import React, { FunctionComponent } from 'react';

import styles from './Shadow.scss';

const Shadow: FunctionComponent<props> = ({ visible, onClick = () => {} }) => {
  let className = styles.shadow;
  if (visible) {
    className += ' ' + styles.visible;
  }

  return <div className={className} onClick={onClick} />;
};

class props {
  visible?: boolean = true;
  onClick?: () => void;
}

export default Shadow;
