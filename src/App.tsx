import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Media from 'react-media';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

import { SessionProvider } from './libs/session/session';

// Config
import { arkipelEndpoint } from 'Config';

// Components
import MenuPane from './components/MenuPane';
import MainContent from './components/MainContent';

// Assets
import './styles/index.scss';
import appStyles from './App.scss';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: arkipelEndpoint,
    credentials: 'include',
  }),
});

class App extends React.PureComponent<props, state> {
  constructor(props: any) {
    super(props);

    this.state = {
      showMenuPane: false,
    };

    // let breakpoints = {
    //   small: '(max-width: 499px)',
    //   medium: '(min-width: 500px) and (max-width: 699px)',
    //   large: '(min-width: 700px)',
    // };
  }

  render() {
    let underPaneShadow = '';
    if (this.state.showMenuPane) {
      underPaneShadow = appStyles.visible + ' ';
    }
    underPaneShadow += appStyles['under-pane-shadow'];

    return (
      <div id="app" className={appStyles.app}>
        <ApolloProvider client={client}>
          <SessionProvider>
            <Router>
              <MenuPane
                visible={this.state.showMenuPane}
                onCloseClick={this.closeMenuPane}
              />
              <Media query="(max-width: 699px)">
                <div className={underPaneShadow} onClick={this.closeMenuPane} />
              </Media>
              <MainContent onMenuOpen={this.openMenuPane} />
            </Router>
          </SessionProvider>
        </ApolloProvider>
      </div>
    );
  }

  openMenuPane = () => {
    this.setState(() => {
      return { showMenuPane: true };
    });
  };

  closeMenuPane = () => {
    this.setState(() => {
      return { showMenuPane: false };
    });
  };
}

type props = {};

type state = {
  showMenuPane: boolean;
};

export default App;
