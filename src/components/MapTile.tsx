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
        src = 'https://arkipel-icons.pages.dev/infra/jungle.svg';
        alt = 'Jungle';
        break;
      case Infrastructure.Quarry:
        src = 'https://arkipel-icons.pages.dev/infra/quarry.svg';
        alt = 'Quarry';
        break;
      case Infrastructure.Apartments:
        src = 'https://arkipel-icons.pages.dev/infra/apartments.svg';
        alt = 'Apartments';
        break;
      case Infrastructure.House:
        src = 'https://arkipel-icons.pages.dev/infra/house.svg';
        alt = 'House';
        break;
      case Infrastructure.WheatField:
        src = 'https://arkipel-icons.pages.dev/infra/wheat_field.svg';
        alt = 'Wheat field';
        break;
      case Infrastructure.AnimalFarm:
        src = 'https://arkipel-icons.pages.dev/infra/animal_farm.svg';
        alt = 'Animal farm';
        break;
      case Infrastructure.NuclearPlant:
        src = 'https://arkipel-icons.pages.dev/infra/nuclear_plant.svg';
        alt = 'Nuclear plant';
        break;
      case Infrastructure.WindTurbine:
        src = 'https://arkipel-icons.pages.dev/infra/wind_turbine.svg';
        alt = 'Wind turbine';
        break;
      case Infrastructure.Port:
        src = 'https://arkipel-icons.pages.dev/infra/port.svg';
        alt = 'Port';
        break;
      case Infrastructure.Hut:
        src = 'https://arkipel-icons.pages.dev/infra/hut.svg';
        alt = 'Bank';
        break;
      case Infrastructure.Warehouse:
        src = 'https://arkipel-icons.pages.dev/infra/warehouse.svg';
        alt = 'Warehouse';
        break;
      case Infrastructure.Garden:
        src = 'https://arkipel-icons.pages.dev/infra/garden.svg';
        alt = 'Garden';
        break;
      default:
        src = 'https://arkipel-icons.pages.dev/infra/empty.svg';
        alt = 'Empty';
    }
  }

  let infraIcon = <img src={src} alt={alt} />;

  let showConstructionBanner = tile.constructionSite !== null;

  return (
    <Style onClick={onClick} style={styleVars}>
      <div className="infra-icon">{infraIcon}</div>
      {showConstructionBanner && <div className="construction-banner"></div>}
    </Style>
  );
};

const Style = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  width: var(--tileWidth);
  height: var(--tileHeight);
  padding-bottom: var(--tilePaddingBottom);
  background: var(--tileColor);
  cursor: var(--cursor);

  div {
    grid-column: 1;
    grid-row: 1;
  }

  .infra-icon img {
    margin: 6px;
    filter: sepia(0.4);
  }

  .construction-banner {
    align-self: end;
    height: 10px;
    margin-bottom: 4px;
    background: repeating-linear-gradient(
      45deg,
      rgb(235, 200, 50),
      yellow 6px,
      black 6px,
      black 14px
    );
    z-index: 100;
  }
`;

class props {
  tile: Tile = new Tile({});
  size?: number = 12;
  clickable?: boolean = false;
  onClick?: () => void = () => {};
}

export default MapTile;
