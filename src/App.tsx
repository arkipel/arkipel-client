import { hot } from 'react-hot-loader/root';
import React, { FunctionComponent, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Media from 'react-media';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

import { SessionProvider } from './libs/session/session';
import { InventoryProvider } from './libs/session/inventory';
import { BankAccountsProvider } from './libs/session/bank_accounts';

// Config
import { arkipelEndpoint } from 'Config';

// Components
import MenuPane from './components/MenuPane';
import MainContent from './components/MainContent';
import NotificationPane from './components/NotificationPane';
import Shadow from './ui/layout/Shadow';

// Assets
import './styles/index.scss';
import appStyles from './App.scss';

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          tile: (_, { args, toReference }) => {
            if (!args) {
              return undefined;
            }

            return toReference({
              __typename: 'Tile',
              id: args.islandId + '_' + args.position,
            });
          },
        },
      },
      Island: {
        fields: {
          constructionSites: {
            merge: (_, newValue) => {
              return newValue;
            },
          },
        },
      },
      Tile: {
        fields: {
          blueprints: {
            merge: (_, newValue) => {
              return newValue;
            },
          },
        },
      },
    },
  }),
  link: new HttpLink({
    uri: arkipelEndpoint,
    credentials: 'include',
  }),
});

const App: FunctionComponent<props> = () => {
  const [showMenuPane, setShowMenuPane] = useState(false);
  const [showNotificationPane, setShowNotificationPane] = useState(false);

  // let breakpoints = {
  //   small: '(max-width: 499px)',
  //   medium: '(min-width: 500px) and (max-width: 699px)',
  //   large: '(min-width: 700px)',
  // };

  let showShadow = showMenuPane || showNotificationPane;

  return (
    <div id="app" className={appStyles.app}>
      <ApolloProvider client={client}>
        <SessionProvider>
          <InventoryProvider>
            <BankAccountsProvider>
              <Router>
                <MenuPane
                  visible={showMenuPane}
                  onCloseClick={() => {
                    setShowMenuPane(false);
                  }}
                />
                <Media query="(max-width: 999px)">
                  <Shadow
                    visible={showShadow}
                    onClick={() => {
                      setShowMenuPane(false);
                      setShowNotificationPane(false);
                    }}
                  />
                </Media>
                <MainContent
                  onMenuOpen={() => {
                    setShowMenuPane(true);
                  }}
                  onNotificationOpen={() => {
                    setShowNotificationPane(true);
                  }}
                />
                <NotificationPane
                  visible={showNotificationPane}
                  onCloseClick={() => {
                    setShowNotificationPane(false);
                  }}
                />
              </Router>
            </BankAccountsProvider>
          </InventoryProvider>
        </SessionProvider>
      </ApolloProvider>
    </div>
  );
};

type props = {};

export default hot(App);
