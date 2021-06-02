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
import MenuPane from './components/MenuPane';
import MainContent from './components/MainContent';
import NotificationPane from './components/NotificationPane';
import Shadow from './ui/layout/Shadow';

import fontRegular from '../src/assets/fonts/rubik/rubik-regular.ttf';
import fontBold from '../src/assets/fonts/rubik/rubik-bold.ttf';
import fontItalic from '../src/assets/fonts/rubik/rubik-italic.ttf';
import fontBoldItalic from '../src/assets/fonts/rubik/rubik-bold-italic.ttf';

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
    <Style>
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
    </Style>
  );
};

type props = {};

const Style = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-flow: column;
  height: 100%;
  max-width: 1200px;
  margin: auto;

  @media all and (max-width: 699px) {
    grid-template-columns: 1fr;
  }

  @media all and (min-width: 700px) and (max-width: 999px) {
    grid-template-columns: 200px 1fr;
  }

  @media all and (min-width: 1000px) {
    grid-template-columns: 200px 1fr 300px;
  }

  /* Fonts */
  @font-face {
    font-family: 'Rubik';
    font-weight: normal;
    font-style: normal;
    src: url(${fontRegular});
  }

  @font-face {
    font-family: 'Rubik';
    font-weight: bold;
    font-style: normal;
    src: url(${fontBold});
  }

  @font-face {
    font-family: 'Rubik';
    font-weight: normal;
    font-style: italic;
    src: url(${fontItalic});
  }

  @font-face {
    font-family: 'Rubik';
    font-weight: bold;
    font-style: italic;
    src: url(${fontBoldItalic});
  }
`;

export default hot(App);
