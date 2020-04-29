import React, { Component } from 'react';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

const APIContext = React.createContext<state>({
  client: undefined,
});

class APIProvider extends Component<props, state> {
  constructor(props: props) {
    super(props);

    const link = createHttpLink({
      uri: 'http://arkipel.local:9192/query',
    });

    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link,
    });

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

type state = { client?: ApolloClient<NormalizedCacheObject> };

export { APIContext, APIProvider };
