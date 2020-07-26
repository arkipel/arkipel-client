import React, { Fragment, FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

import MapTile from './MapTile';

import styles from './IslandMap.scss';

import Island from '../models/Island';
import Tile from '../models/Tile';
import { TileKind } from '../generated/globalTypes';

const IslandMap: FunctionComponent<props> = ({ island }) => {
  const history = useHistory();

  let map = Array<any>(256);
  for (let i = 0; i < 256; i++) {
    map[i] = (
      <MapTile
        key={i}
        kind={positionToKind(i)}
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

const positionToKind = (pos: number): TileKind => {
  let k = dna[pos];

  switch (k) {
    case '1':
      return TileKind.WATER;
    case '2':
      return TileKind.SAND;
    case '3':
      return TileKind.LAND;
    default:
      return TileKind.DEEP_WATER;
  }
};

const dna =
  '0000000000000000' +
  '0000011111100000' +
  '0001112222111000' +
  '0011222332221100' +
  '0012233333322100' +
  '0112333333332110' +
  '0122333333332210' +
  '0123333333333210' +
  '0123333333333210' +
  '0122333333332210' +
  '0112333333332110' +
  '0012233333322100' +
  '0011222332221100' +
  '0001112222111000' +
  '0000011111100000' +
  '0000000000000000';
