import React, { Fragment, FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

import MapTile from './MapTile';

import styles from './IslandMap.scss';

import Island from '../models/Island';
import Tile from '../models/Tile';

const IslandMap: FunctionComponent<props> = ({ island }) => {
  const history = useHistory();

  let map = Array<any>(256);
  for (let i = 0; i < 256; i++) {
    map[i] = (
      <MapTile
        key={i}
        tile={island.tiles[i] || new Tile({ position: i })}
        clickable={island.id !== ''}
        onClick={() => {
          history.push('/island/tiles/' + i);
        }}
      />
    );
  }

  return (
    <Fragment>
      <div className={styles.island}>{map}</div>
    </Fragment>
  );
};

class props {
  island: Island = new Island({});
}

export default IslandMap;
