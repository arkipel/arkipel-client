import React, { Component } from 'react';

import { Client } from './client';

import { Island } from '../../models/Island';

const APIContext = React.createContext<state>({
  client: new Client(''),
});

class APIProvider extends Component<props, state> {
  constructor(props: props) {
    super(props);

    let client = new Client('https://api.arkipel.io');

    // Build schema
    client.schema.addType(new Island());

    this.state = { client };
  }

  render() {
    return (
      <APIContext.Provider value={this.state}>
        {this.props.children}
      </APIContext.Provider>
    );
  }
}

type props = {};

type state = {
  client: Client;
};

export { APIContext, APIProvider };
