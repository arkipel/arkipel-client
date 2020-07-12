import React, { Fragment, FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

import MapTile from './MapTile';

import styles from './IslandMap.scss';

import Island from '../models/Island';

const IslandMap: FunctionComponent<props> = ({ island }) => {
  const history = useHistory();

  let islandId = island.id || '';

  let map = island.tiles.map((tile, i) => {
    return (
      <MapTile
        key={Math.random()}
        tile={tile}
        clickable={islandId !== ''}
        onClick={() => {
          history.push('/archipelago/islands/' + islandId + '/tiles/' + i);
        }}
      />
    );
  });

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
