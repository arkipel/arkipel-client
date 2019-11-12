import React, { Component } from 'react';

const SessionContext = React.createContext({});

class SessionProvider extends Component {
  constructor(props: props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <SessionContext.Provider value={{}}>
        {this.props.children}
      </SessionContext.Provider>
    );
  }
}

type props = {};

export { SessionContext, SessionProvider };
