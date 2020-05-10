import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

const IslandMap = () => {
  const { islandID } = useParams();

  const { data, loading, error } = useQuery(
    gql`
      query getIsland($islandID: String!) {
        island(islandID: $islandID) {
          ... on Island {
            id
            name
            dna
          }
        }
      }
    `,
    { variables: { islandID } },
  );

  if (loading || error) {
    return <></>;
  }

  let dna: string;

  if (data.island.__typename === 'NotFound') {
    dna = '0'.repeat(400);
  } else {
    dna = data.island.dna;
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

    map.push(<div key={Math.random()} className={className}></div>);
  }

  return (
    <Fragment>
      <h2>Map</h2>
      <div className="island">{map}</div>
    </Fragment>
  );
};

export default IslandMap;
