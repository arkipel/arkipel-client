import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { Client } from '../../libs/jsonapi/client';

import { Island } from '../../models/Island';

class IslandsList extends React.PureComponent<props, state> {
  constructor(props: props) {
    super(props);

    let client = new Client('http://127.0.0.1:9192');

    client.schema.addType(new Island());

    // Get islands
    let req = client.getMany<Island>({ type: 'islands' });
    req.then((islands) => {
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
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
            {this.state.islands.map((island) => {
              return (
                <tr key={island.id}>
                  <th>
                    <NavLink to={'islands/' + island.id}>{island.name}</NavLink>
                  </th>
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

export default IslandsList;
