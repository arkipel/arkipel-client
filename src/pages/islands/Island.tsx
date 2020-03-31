import React, { Fragment } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import IslandMap from './Map';
import IslandInfo from './Info';

import { Client } from '../../libs/jsonapi/client';

import { Island } from '../../models/Island';

class IslandPage extends React.PureComponent<props, state> {
  constructor(props: props) {
    super(props);

    let client = new Client('https://api.arkipel.io');

    client.schema.addType(new Island());

    // Get islands
    let req = client.getOne<Island>('islands', 'kiiwi');
    req.then((island) => {
      this.setState({ island: island ?? new Island() });
    });

    this.state = {
      island: new Island(),
    };
  }

  render() {
    return (
      <Fragment>
        <h1>{this.state.island.name}</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/archipelago/islands/kiiwi">Map</NavLink>
            </li>
            <li>
              <NavLink to="/archipelago/islands/kiiwi/info">Info</NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/archipelago/islands/:id" exact component={IslandMap} />
          <Route
            path="/archipelago/islands/:id/info"
            exact
            component={IslandInfo}
          />
        </Switch>
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
