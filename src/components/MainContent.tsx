import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

// Pages
import About from '../pages/About';
import Home from '../pages/Home';
import Article from '../pages/Article';
import ArchipelagoOverview from '../pages/archipelago/Overview';
import Ranking from '../pages/archipelago/Ranking';
import SearchIslandsPage from '../pages/archipelago/Search';
import CommunityPage from '../pages/archipelago/Community';
import PlayerProfile from '../pages/profile/PlayerProfile';
import Profile from '../pages/island/Profile';
import MapPage from '../pages/island/Map';
import CitizensPage from '../pages/island/Citizens';
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
import CitizenPage from '../pages/citizen/Citizen';

// Components
import Scrollable from '../ui/layout/Scrollable';

const MainContent = () => {
  return (
    <StyledMainContent>
      <Scrollable>
        <StyledContent>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/article/:articleId" exact component={Article} />
            <Route path="/about" exact component={About} />
            <Route path="/login" exact component={Login} />
            <Route path="/registration" exact component={Registration} />
            <Route path="/account/settings" exact component={Settings} />
            <Route path="/profile/:profileId" exact component={PlayerProfile} />
            <Route path="/island/profile" exact component={Profile} />
            <Route path="/island/map" exact component={MapPage} />
            <Route path="/island/citizens" exact component={CitizensPage} />
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
            <Route path="/citizen/:citizenId" exact component={CitizenPage} />
          </Switch>
        </StyledContent>
      </Scrollable>
    </StyledMainContent>
  );
};

const StyledMainContent = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  gap: 10px;
  grid-row: 1;
  grid-column: 2;
  align-content: start;
  min-height: 0;
  height: 100%;
  width: 100%;

  @media all and (max-width: 699px) {
    grid-column: 1;
  }

  @media all and (min-width: 700px) and (max-width: 999px) {
    margin-right: 10px;
  }
`;

const StyledContent = styled.div`
  display: grid;
  grid-gap: 10px;
  align-content: start;
  background: #fff;
  padding: 10px;
  border-radius: 4px;

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

  @media all and (max-width: 699px) {
    min-height: 100%;
  }
`;

export default MainContent;
