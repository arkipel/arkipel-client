import React, { FunctionComponent } from 'react';

import styles from './MapTile.scss';

import Tile from '../models/Tile';
import { Infrastructure, TileKind } from '../generated/globalTypes';

const MapTile: FunctionComponent<props> = ({
  tile,
  size,
  clickable = false,
  onClick = () => {},
}) => {
  // Tile kind
  let className = styles['deepWater'];
  switch (tile.kind()) {
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

  // Size must be equal or greater than 1.
  if (size && size <= 0) {
    size = 1;
  }

  if (!clickable) {
    className += ' ' + styles.inactive;
    onClick = () => {};
  }

  let src: string = '';
  let alt: string = '';
  if (tile.infrastructure) {
    switch (tile.infrastructure) {
      case Infrastructure.JUNGLE:
        src = 'https://icons.arkipel.io/infra/jungle.svg';
        alt = 'Jungle';
        break;
      case Infrastructure.QUARRY:
        src = 'https://icons.arkipel.io/infra/quarry.svg';
        alt = 'Quarry';
        break;
      case Infrastructure.APARTMENTS:
        src = 'https://icons.arkipel.io/infra/apartments.svg';
        alt = 'Apartments';
        break;
      case Infrastructure.HOUSE:
        src = 'https://icons.arkipel.io/infra/house.svg';
        alt = 'House';
        break;
      case Infrastructure.WHEAT_FIELD:
        src = 'https://icons.arkipel.io/infra/wheat_field.svg';
        alt = 'Wheat field';
        break;
      case Infrastructure.ANIMAL_FARM:
        src = 'https://icons.arkipel.io/infra/animal_farm.svg';
        alt = 'Animal farm';
        break;
      case Infrastructure.NUCLEAR_PLANT:
        src = 'https://icons.arkipel.io/infra/nuclear_plant.svg';
        alt = 'Nuclear plant';
        break;
      case Infrastructure.WIND_TURBINE:
        src = 'https://icons.arkipel.io/infra/wind_turbine.svg';
        alt = 'Wind turbine';
        break;
      case Infrastructure.PORT:
        src = 'https://icons.arkipel.io/infra/port.svg';
        alt = 'Port';
        break;
      case Infrastructure.BANK:
        src = 'https://icons.arkipel.io/infra/bank.svg';
        alt = 'Bank';
        break;
    }
  }

  let infraIcon = <img src={src} alt={alt} />;

  let style: any = {};
  if (size) {
    style.height = size + 'px';
    style.width = size + 'px';
  } else {
    style.width = '100%';
    style.height = 0;
    style.paddingBottom = '100%';
  }

  return (
    <div className={className} onClick={onClick} style={style}>
      {infraIcon}
    </div>
  );
};

class props {
  tile: Tile = new Tile({});
  size?: number = 12;
  clickable?: boolean = false;
  onClick?: () => void = () => {};
}

export default MapTile;
