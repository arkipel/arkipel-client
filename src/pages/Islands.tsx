import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { Client } from '../libs/jsonapi/client.ts';

import { Island } from '../models/Island.ts';

class Islands extends React.PureComponent<props, state> {
  constructor(props: props) {
    super(props);

    let client = new Client('http://localhost:6280');

    // Get islands
    let req = client.getMany<Island>();
    req.then(islands => {
      this.setState({ islands });
    });

    this.state = {
      islands: new Array<Island>(),
    };
  }

  render() {
    return (
      <Fragment>
        <h1>Islands</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Most powerful</th>
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
            {this.state.islands.map(island => {
              return (
                <tr key={island.id}>
                  <th>
                    <NavLink to={'islands/' + island.id}>{island.id}</NavLink>
                  </th>
                  <td>
                    <i>TBD</i>
                  </td>
                  <td>0</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

type props = {};

type state = {
  islands: Array<Island>;
};

export default Islands;
