import { hot } from 'react-hot-loader/root';
import React, { FunctionComponent, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Media from 'react-media';
import styled from 'styled-components';

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
import Header from './components/Header';
import MenuPane from './components/MenuPane';
import MainContent from './components/MainContent';
import NotificationPane from './components/NotificationPane';
import Shadow from './ui/layout/Shadow';

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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

const App: FunctionComponent<props> = () => {
  const [showMenuPane, setShowMenuPane] = useState(false);
  const [showNotificationPane, setShowNotificationPane] = useState(false);

  let showShadow = showMenuPane || showNotificationPane;

  return (
    <StyledApp>
      <Shadow
        visible={showShadow}
        onClick={() => {
          setShowMenuPane(false);
          setShowNotificationPane(false);
        }}
      />
      <ApolloProvider client={client}>
        <SessionProvider>
          <InventoryProvider>
            <BankAccountsProvider>
              <Header
                onMenuOpen={() => {
                  setShowMenuPane(!showMenuPane);
                  setShowNotificationPane(false);
                }}
                onNotificationOpen={() => {
                  setShowMenuPane(false);
                  setShowNotificationPane(!showNotificationPane);
                }}
              />
              <StyledBody>
                <Router>
                  <Media query="(max-width: 999px)"></Media>
                  <MenuPane
                    visible={showMenuPane}
                    onCloseClick={() => {
                      setShowMenuPane(false);
                    }}
                  />
                  <MainContent />
                  <NotificationPane
                    visible={showNotificationPane}
                    onCloseClick={() => {
                      setShowNotificationPane(false);
                    }}
                  />
                </Router>
              </StyledBody>
            </BankAccountsProvider>
          </InventoryProvider>
        </SessionProvider>
      </ApolloProvider>
    </StyledApp>
  );
};

type props = {};

const StyledApp = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr;
  gap: 10px;
  height: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 0 10px 10px 10px;

  @media all and (max-width: 699px) {
    padding: 0;
    gap: 0;
  }

  @media all and (min-width: 700px) and (max-width: 999px) {
    padding: 0 0 10px 0;
  }
`;

const StyledBody = styled.div`
  display: grid;
  grid-row: 2;
  grid-column: 1;
  gap: 10px;
  min-height: 0;
  height: 100%;

  @media all and (max-width: 699px) {
    grid-template-columns: 1fr;
    gap: 0;
    padding: 0;
  }

  @media all and (min-width: 700px) and (max-width: 999px) {
    grid-template-columns: 200px 1fr;
    padding: 0 10px 0 0;
  }

  @media all and (min-width: 1000px) {
    grid-template-columns: 200px 1fr 300px;
  }
`;

export default hot(App);
