import React, { FunctionComponent, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Media from 'react-media';
import styled from 'styled-components';

import { SessionContext } from '../libs/session/session';

// Pages
import About from '../pages/About';
import Home from '../pages/Home';
import ArchipelagoOverview from '../pages/archipelago/Overview';
import Ranking from '../pages/archipelago/Ranking';
import SearchIslandsPage from '../pages/archipelago/Search';
import CommunityPage from '../pages/archipelago/Community';
import PlayerProfile from '../pages/profile/PlayerProfile';
import Profile from '../pages/island/Profile';
import MapPage from '../pages/island/Map';
import InfrastructurePage from '../pages/island/Infrastructure';
import ResourcesPage from '../pages/island/Resources';
import TreasuryPage from '../pages/island/Treasury';
import EventsPage from '../pages/island/Events';
import TilePage from '../pages/island/Tile';
import MarketPrices from '../pages/market/MarketPrices';
import MarketHistory from '../pages/market/MarketHistory';
import TradePage from '../pages/market/Trade';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import Settings from '../pages/account/Settings';

// Components
import APIStatus from '../components/APIStatus';
import { TopBar, Box } from '../ui/layout/TopBar';
import Scrollable from '../ui/layout/Scrollable';

const MainContent: FunctionComponent<props> = ({
  onMenuOpen,
  onNotificationOpen,
}) => {
  const session = useContext(SessionContext);

  return (
    <Style>
      <TopBar>
        <div>
          <Media
            query="(max-width: 699px)"
            render={() => (
              <Box onClick={onMenuOpen}>
                <img
                  src="https://icons.arkipel.io/ui/menu.svg"
                  alt="&#10092;"
                />
              </Box>
            )}
          />
          <Box>{session.loggedIn && <span>{session.username}</span>}</Box>
        </div>
        <div>
          <Box>
            <APIStatus />
          </Box>
          <Media
            query="(max-width: 999px)"
            render={() => (
              <Box onClick={onNotificationOpen}>
                <img
                  src="https://icons.arkipel.io/ui/notification.svg"
                  alt="&#128276;"
                />
              </Box>
            )}
          />
        </div>
      </TopBar>
      <Scrollable>
        <ContentStyle>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/login" exact component={Login} />
            <Route path="/registration" exact component={Registration} />
            <Route path="/account/settings" exact component={Settings} />
            <Route path="/profile/:profileId" exact component={PlayerProfile} />
            <Route path="/island/profile" exact component={Profile} />
            <Route path="/island/map" exact component={MapPage} />
            <Route
              path="/island/infrastructure"
              exact
              component={InfrastructurePage}
            />
            <Route path="/island/resources" exact component={ResourcesPage} />
            <Route path="/island/treasury" exact component={TreasuryPage} />
            <Route path="/island/events" exact component={EventsPage} />
            <Route path="/island/tiles/:position" exact component={TilePage} />
            <Route
              path="/archipelago/overview"
              exact
              component={ArchipelagoOverview}
            />
            <Route path="/archipelago/ranking" exact component={Ranking} />
            <Route path="/market/prices" exact component={MarketPrices} />
            <Route path="/market/history" exact component={MarketHistory} />
            <Route path="/market/trade" exact component={TradePage} />
            <Route
              path="/archipelago/search"
              exact
              component={SearchIslandsPage}
            />
            <Route
              path="/archipelago/community"
              exact
              component={CommunityPage}
            />
          </Switch>
        </ContentStyle>
      </Scrollable>
    </Style>
  );
};

type props = {
  onMenuOpen: () => void;
  onNotificationOpen: () => void;
};

const Style = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  align-content: start;
  min-height: 0;
  height: 100%;
  width: 100%;
  background: #fff;
  scrollbar-width: thin;
  scrollbar-color: #ccc white;

  @media all and (max-width: 699px) {
    grid-row: 1;
    grid-column: 1;
  }

  @media all and (min-width: 700px) and (max-width: 999px) {
    grid-row: 1;
    grid-column: 2;
  }

  @media all and (min-width: 1000px) {
    grid-row: 1;
    grid-column: 2;
  }
`;

const ContentStyle = styled.div`
  display: grid;
  grid-gap: 10px;
  align-content: start;
  min-height: 100%;
  padding: 10px;

  p {
    font-size: 18px;
  }

  a {
    color: #666;

    &:hover {
      color: #444;
    }
  }

  nav {
    ul {
      display: grid;
      gap: 4px;
      grid-auto-columns: min-content;
      grid-auto-flow: column;

      li {
        width: auto;

        a {
          display: block;
          width: auto;
          padding: 8px 10px;
          color: #444;
          text-decoration: none;
          background: #eee;

          &.active {
            background: #ccc;
          }

          &:hover {
            background: #ccc;
          }
        }
      }
    }
  }

  table {
    text-align: left;
    border-collapse: collapse;

    thead {
      th {
        border-bottom: 1px solid black;
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid #eee;

        &:first-child {
          border-top: 1px solid #eee;
        }
      }
    }

    th,
    td {
      padding: 4px;
    }
  }
`;

export default MainContent;
