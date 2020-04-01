import React, { Fragment } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import { APIContext } from '../../libs/jsonapi/context';

import IslandMap from './Map';
import IslandInfo from './Info';

import { Island } from '../../models/Island';

class IslandPage extends React.PureComponent<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {
      island: new Island(),
    };
  }

  componentDidMount() {
    // Get islands
    let req = this.context.client.getOne<Island>('islands', 'kiiwi');
    req.then((island) => {
      this.setState({ island: island ?? new Island() });
    });
  }

  render() {
    return (
      <Fragment>
        <h1>{this.state.island.name}</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/archipelago/islands/kiiwi" exact>
                Map
              </NavLink>
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

  // static contextType = APIContext;
  context!: React.ContextType<typeof APIContext>;
}

IslandPage.contextType = APIContext;

type props = {
  id: string;
};

type state = {
  island: Island;
};

export default IslandPage;
