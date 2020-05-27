import React, { Fragment, FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

import Island from '../../models/Island';

const IslandMap: FunctionComponent<props> = ({ island }) => {
  const history = useHistory();

  let islandId = island.id || '';
  let dna = island.dna;

  if (!dna) {
    dna = '0'.repeat(400);
  }

  let map = new Array<JSX.Element>();
  for (let i = 0; i < dna.length; i++) {
    const t = dna[i];

    // Tile kind
    let kind = 'deep_water';
    switch (t) {
      case '1':
        kind = 'water';
        break;
      case '2':
        kind = 'sand';
        break;
      case '3':
        kind = 'land';
        break;
    }

    let className = 'tile ' + kind;

    map.push(
      <div
        key={Math.random()}
        className={className}
        onClick={() => {
          history.push('/archipelago/islands/' + islandId + '/tiles/' + i);
        }}
      ></div>,
    );
  }

  return (
    <Fragment>
      <h2>Map</h2>
      <div className="island">{map}</div>
    </Fragment>
  );
};

class props {
  island: Island = new Island({});
}

export default IslandMap;
