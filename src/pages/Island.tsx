import React, { Fragment } from 'react';

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
    return (
      <Fragment>
        <h1>{this.state.island.attributes.name}</h1>
        <h2>Map</h2>
        <p className="msg-error">Work in progress.</p>
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
