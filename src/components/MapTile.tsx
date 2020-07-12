import React, { FunctionComponent } from 'react';

import styles from './Tile.scss';

import Tile from '../models/Tile';
import { Infrastructure, TileKind } from '../generated/globalTypes';

const MapTile: FunctionComponent<props> = ({ tile }) => {
  // Tile kind
  let kind = 'deepWater';
  switch (tile.kind) {
    case TileKind.WATER:
      kind = 'water';
      break;
    case TileKind.SAND:
      kind = 'sand';
      break;
    case TileKind.LAND:
      kind = 'land';
      break;
  }

  let className = styles[kind];

  let infraIcon = <></>;
  if (tile.infrastructure) {
    switch (tile.infrastructure) {
      case Infrastructure.FOREST:
        infraIcon = (
          <img src="https://icons.arkipel.io/infra/jungle.svg" alt="Forest" />
        );
        break;
      default:
        break;
    }
  }

  return (
    <div key={Math.random()} className={className}>
      {infraIcon}
    </div>
  );
};

class props {
  tile: Tile = new Tile({});
  onC;
}

export default MapTile;
