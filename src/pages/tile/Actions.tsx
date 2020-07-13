import React, { Fragment } from 'react';

import styles from './Actions.scss';

const TileActions = () => {
  return (
    <Fragment>
      <h3>Actions</h3>
      <div className={styles.actionsBoard}>
        <div className={styles.description}>
          You may claim this tile at no cost. You may claim this tile at no
          cost. You may claim this tile at no cost.
        </div>
        <div className={styles.buttons}>
          <button>Claim</button>
        </div>
        <div className={styles.description}>
          You may <b>not</b> abandon this tile because you do not own it.
        </div>
        <div className={styles.buttons}>
          <button disabled>Abandoning the tiling</button>
        </div>
        <div className={styles.description}>
          You may <b>not</b> sell this tile because you do not own it.
        </div>
        <div className={styles.buttons}>
          <button disabled>Sell</button>
        </div>
      </div>
    </Fragment>
  );
};

export default TileActions;
