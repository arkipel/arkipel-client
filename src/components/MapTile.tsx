import React, { FunctionComponent } from 'react';

import styles from './MapTile.scss';

import Tile from '../models/Tile';
import { Infrastructure, TileKind } from '../generated/globalTypes';

const MapTile: FunctionComponent<props> = ({
  tile,
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

  if (!clickable) {
    className += ' ' + styles.inactive;
    onClick = () => {};
  }

  let infraIcon = <></>;
  if (tile.infrastructure) {
    switch (tile.infrastructure) {
      case Infrastructure.JUNGLE:
        infraIcon = (
          <img src="https://icons.arkipel.io/infra/jungle.svg" alt="Jungle" />
        );
        break;
      case Infrastructure.QUARRY:
        infraIcon = (
          <img src="https://icons.arkipel.io/infra/quarry.svg" alt="Quarry" />
        );
        break;
      case Infrastructure.APARTMENTS:
        infraIcon = (
          <img
            src="https://icons.arkipel.io/infra/apartments.svg"
            alt="Apartments"
          />
        );
        break;
      case Infrastructure.HOUSE:
        infraIcon = (
          <img src="https://icons.arkipel.io/infra/house.svg" alt="House" />
        );
        break;
      case Infrastructure.WHEAT_FIELD:
        infraIcon = (
          <img
            src="https://icons.arkipel.io/infra/wheat_field.svg"
            alt="Wheat field"
          />
        );
        break;
      case Infrastructure.ANIMAL_FARM:
        infraIcon = (
          <img
            src="https://icons.arkipel.io/infra/animal_farm.svg"
            alt="Animal farm"
          />
        );
        break;
      case Infrastructure.NUCLEAR_PLANT:
        infraIcon = (
          <img
            src="https://icons.arkipel.io/infra/nuclear_plant.svg"
            alt="Nuclear plant"
          />
        );
        break;
      case Infrastructure.WIND_TURBINE:
        infraIcon = (
          <img
            src="https://icons.arkipel.io/infra/wind_turbine.svg"
            alt="Wind turbine"
          />
        );
        break;
      case Infrastructure.PORT:
        infraIcon = (
          <img src="https://icons.arkipel.io/infra/port.svg" alt="Port" />
        );
        break;
      case Infrastructure.BANK:
        infraIcon = (
          <img src="https://icons.arkipel.io/infra/bank.svg" alt="Bank" />
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
  clickable?: boolean = false;
  onClick?: () => void = () => {};
}

export default MapTile;
