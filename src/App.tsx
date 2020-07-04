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
import NotificationPane from './components/NotificationPane';
import Shadow from './ui/misc/Shadow';

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
      showNotificationPane: true,
    };

    // let breakpoints = {
    //   small: '(max-width: 499px)',
    //   medium: '(min-width: 500px) and (max-width: 699px)',
    //   large: '(min-width: 700px)',
    // };
  }

  render() {
    let showShadow = this.state.showMenuPane || this.state.showNotificationPane;

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
                <Shadow
                  visible={showShadow}
                  onClick={() => {
                    this.closeMenuPane();
                    this.closeNotificationPane();
                  }}
                />
              </Media>
              <MainContent
                onMenuOpen={this.openMenuPane}
                onNotificationOpen={this.openNotificationPane}
              />
              <NotificationPane
                visible={this.state.showNotificationPane}
                onCloseClick={this.closeNotificationPane}
              />
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

  openNotificationPane = () => {
    this.setState(() => {
      return { showNotificationPane: true };
    });
  };

  closeNotificationPane = () => {
    this.setState(() => {
      return { showNotificationPane: false };
    });
  };
}

type props = {};

type state = {
  showMenuPane: boolean;
  showNotificationPane: boolean;
};

export default App;
