import React, { Fragment, FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

import MapTile from './MapTile';

import Island from '../models/Island';
import Tile from '../models/Tile';

const IslandMap: FunctionComponent<props> = ({ island }) => {
  let map = Array<any>(100);
  for (let i = 0; i < 100; i++) {
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
      <div style={style}>{map}</div>
    </Fragment>
  );
};

class props {
  island: Island = new Island({});
}

const style = {
  display: 'grid',
  gridTemplateColumns: 'repeat(10, 0.1fr)',
  gridTemplateRows: 'repeat(10, 0.1fr)',
  gap: '1px',
};

export default IslandMap;
