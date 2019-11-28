import React, { Component } from 'react';

const ClientContext = React.createContext({});

class ClientProvider extends Component {
  constructor(props: props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <ClientContext.Provider
        value={{
          test: 1,
        }}
      >
        {this.props.children}
      </ClientContext.Provider>
    );
  }
}

type props = {};

export { ClientContext, ClientProvider };
