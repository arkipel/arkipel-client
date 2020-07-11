import React, { Fragment, FunctionComponent } from 'react';

import Tile from '../../models/Tile';

const TileSummary: FunctionComponent<props> = ({ tile }) => {
  return (
    <Fragment>
      <h3>Summary</h3>
      <p>
        <b>Kind:</b> {tile.kind.toLowerCase()}
        <br />
        <b>Infrastructure:</b> {tile.infrastructure.toLowerCase()}
        <br />
        <b>Level:</b> {tile.level}
      </p>
    </Fragment>
  );
};

class props {
  tile: Tile = new Tile({});
}

export default TileSummary;
