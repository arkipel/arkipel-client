import React, { Fragment, useState } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import IslandMap from './Map';
import IslandInfo from './Info';

const IslandPage = () => {
  const [islandName] = useState('');

  return (
    <Fragment>
      <h1>{islandName}</h1>
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
};

export default IslandPage;
