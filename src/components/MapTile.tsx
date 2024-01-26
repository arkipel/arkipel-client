import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import Tile from '../models/Tile';
import { Infrastructure, TileKind } from '../generated/graphql';

const MapTile: FunctionComponent<props> = ({
  tile,
  size,
  clickable = false,
  onClick = () => {},
}) => {
  // Tile kind
  let tileColor = '#3a7ead';
  switch (tile.kind()) {
    case TileKind.Water:
      tileColor = '#669abd';
      break;
    case TileKind.Sand:
      tileColor = '#e8e0c9';
      break;
    case TileKind.Land:
      tileColor = '#accfa0';
      break;
  }

  // Size must be equal or greater than 1.
  if (size && size <= 0) {
    size = 1;
  }

  let cursor = 'default';
  if (clickable) {
    cursor = 'pointer';
    onClick = () => {};
  }

  let tileHeight = '';
  let tileWidth = '';
  let tilePaddingBottom = '';
  if (size) {
    tileHeight = size + 'px';
    tileWidth = size + 'px';
  } else {
    tileWidth = '100%';
    tileHeight = '0';
    tilePaddingBottom = '100%';
  }

  let styleVars = {
    '--tileColor': tileColor,
    '--tileWidth': tileWidth,
    '--tileHeight': tileHeight,
    '--tilePaddingBottom': tilePaddingBottom,
    '--cursor': cursor,
  } as React.CSSProperties;

  let src: string = '';
  let alt: string = '';
  if (tile.infrastructure) {
    switch (tile.infrastructure) {
      case Infrastructure.Jungle:
        src = 'https://icons.arkipel.io/infra/jungle.svg';
        alt = 'Jungle';
        break;
      case Infrastructure.Quarry:
        src = 'https://icons.arkipel.io/infra/quarry.svg';
        alt = 'Quarry';
        break;
      case Infrastructure.Apartments:
        src = 'https://icons.arkipel.io/infra/apartments.svg';
        alt = 'Apartments';
        break;
      case Infrastructure.House:
        src = 'https://icons.arkipel.io/infra/house.svg';
        alt = 'House';
        break;
      case Infrastructure.WheatField:
        src = 'https://icons.arkipel.io/infra/wheat_field.svg';
        alt = 'Wheat field';
        break;
      case Infrastructure.AnimalFarm:
        src = 'https://icons.arkipel.io/infra/animal_farm.svg';
        alt = 'Animal farm';
        break;
      case Infrastructure.NuclearPlant:
        src = 'https://icons.arkipel.io/infra/nuclear_plant.svg';
        alt = 'Nuclear plant';
        break;
      case Infrastructure.WindTurbine:
        src = 'https://icons.arkipel.io/infra/wind_turbine.svg';
        alt = 'Wind turbine';
        break;
      case Infrastructure.Port:
        src = 'https://icons.arkipel.io/infra/port.svg';
        alt = 'Port';
        break;
      case Infrastructure.Hut:
        src = 'https://icons.arkipel.io/infra/hut.svg';
        alt = 'Bank';
        break;
      case Infrastructure.Warehouse:
        src = 'https://icons.arkipel.io/infra/warehouse.svg';
        alt = 'Warehouse';
        break;
      case Infrastructure.Garden:
        src = 'https://icons.arkipel.io/infra/garden.svg';
        alt = 'Garden';
        break;
    }
  }

  let infraIcon = <img src={src} alt={alt} />;

  return (
    <Style onClick={onClick} style={styleVars}>
      {infraIcon}
    </Style>
  );
};

const Style = styled.div`
  width: var(--tileWidth);
  height: var(--tileHeight);
  padding-bottom: var(--tilePaddingBottom);
  background: var(--tileColor);
  cursor: var(--cursor);

  img {
    margin: 6px;
    filter: sepia(0.4);
  }
`;
class props {
  tile: Tile = new Tile({});
  size?: number = 12;
  clickable?: boolean = false;
  onClick?: () => void = () => {};
}

export default MapTile;
