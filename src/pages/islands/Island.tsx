import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { IslandMap } from 'Map';

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
              <NavLink to="kiiwi" activeClassName="active">
                Map
              </NavLink>
            </li>
            <li>
              <NavLink to="kiiwi/info" activeClassName="active">
                Info
              </NavLink>
            </li>
            <li>
              <NavLink to="kiiwi/people" activeClassName="active">
                People
              </NavLink>
            </li>
            <li>
              <NavLink to="kiiwi/events" activeClassName="active">
                Events
              </NavLink>
            </li>
          </ul>
        </nav>
        <h2>Map</h2>
        <IslandMap />
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
