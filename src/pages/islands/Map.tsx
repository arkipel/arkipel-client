import React, { Fragment } from 'react';

const IslandMap = () => {
  return (
    <Fragment>
      <h2>Map</h2>
      <div className="island">
        {(() => {
          let tiles = new Array<any>();
          for (let i = 0; i < 400; i++) {
            tiles.push(<div key={i} className="tile"></div>);
          }
          return tiles;
        })()}
      </div>
    </Fragment>
  );
};

export default IslandMap;
