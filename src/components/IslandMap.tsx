import React, { Fragment, FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

import MapTile from './MapTile';

import styles from './IslandMap.scss';

import Island from '../models/Island';
import Tile from '../models/Tile';

const IslandMap: FunctionComponent<props> = ({ island }) => {
  let map = Array<any>(256);
  for (let i = 0; i < 256; i++) {
    map[i] = (
      <NavLink key={i} exact to={'/island/tiles/' + i}>
        <MapTile
          tile={island.tiles[i] || new Tile({ position: i })}
          clickable={island.id !== ''}
        />
      </NavLink>
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
