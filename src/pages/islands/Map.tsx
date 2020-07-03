import React, { Fragment, FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './Map.scss';

import Island from '../../models/Island';

const IslandMap: FunctionComponent<props> = ({ island }) => {
  const history = useHistory();

  let islandId = island.id || '';
  let dna = island.dna;

  if (!dna) {
    dna = '0'.repeat(400);
  }

  let map = new Array<JSX.Element>();
  for (let i = 0; i < dna.length; i++) {
    const t = dna[i];

    // Tile kind
    let kind = 'deepWater';
    switch (t) {
      case '1':
        kind = 'water';
        break;
      case '2':
        kind = 'sand';
        break;
      case '3':
        kind = 'land';
        break;
    }

    let className = styles.tile + ' ' + styles[kind];

    map.push(
      <div
        key={Math.random()}
        className={className}
        onClick={() => {
          history.push('/archipelago/islands/' + islandId + '/tiles/' + i);
        }}
      ></div>,
    );
  }

  return (
    <Fragment>
      <h2>Map</h2>
      <div className={styles.island}>{map}</div>
    </Fragment>
  );
};

class props {
  island: Island = new Island({});
}

export default IslandMap;
