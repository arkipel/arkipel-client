import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { Client } from '../libs/jsonapi/client.ts';

import { Island } from '../models/Island.ts';

class IslandPage extends React.PureComponent<props, state> {
  constructor(props: props) {
    super(props);

    let client = new Client('http://localhost:6280');

    // Get islands
    let req = client.getOne<Island>('kiiwi');
    req.then(island => {
      this.setState({ island });
    });

    this.state = {
      island: new Island('abc'),
    };
  }

  render() {
    console.log('island', this.state.island);

    return (
      <Fragment>
        <h1>{this.state.island.id}</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="kiiwi/map">Map</NavLink>
            </li>
            <li>
              <NavLink to="kiiwi/info">Info</NavLink>
            </li>
          </ul>
        </nav>
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
  }
}

type props = {
  id: string;
};

type state = {
  island: Island;
};

export default IslandPage;
