import React, { FunctionComponent } from 'react';

import styles from './MapTile.scss';

import Tile from '../models/Tile';
import { Infrastructure, TileKind } from '../generated/globalTypes';

const MapTile: FunctionComponent<props> = ({ tile, clickable, onClick }) => {
  // Tile kind
  let className = styles['deepWater'];
  switch (tile.kind) {
    case TileKind.WATER:
      className = styles['water'];
      break;
    case TileKind.SAND:
      className = styles['sand'];
      break;
    case TileKind.LAND:
      className = styles['land'];
      break;
  }

  if (!clickable) {
    className += ' ' + styles.inactive;
    onClick = () => {};
  }

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
    <div className={className} onClick={onClick}>
      {infraIcon}
    </div>
  );
};

class props {
  tile: Tile = new Tile({});
  clickable: boolean = false;
  onClick: () => void = () => {};
}

export default MapTile;
