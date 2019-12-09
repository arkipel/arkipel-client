import React, { Component } from 'react';

import { Client } from './client.ts';

const ClientContext = React.createContext({
  client: new Client(),
});

class ClientProvider extends Component<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {
      client: new Client(),
    };
  }

  render() {
    return (
      <ClientContext.Provider value={this.state}>
        {this.props.children}
      </ClientContext.Provider>
    );
  }
}

type props = {};

type state = {
  client: Client;
};

export { ClientContext, ClientProvider };
