import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

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
            <Route path="/" exact>
              {Home}
            </Route>
            <Route path="/about" exact>
              {About}
            </Route>
            <Route path="/login" exact>
              {Login}
            </Route>
            <Route path="/registration" exact>
              {Registration}
            </Route>
            <Route path="/account/settings" exact>
              {Settings}
            </Route>
            <Route path="/profile/:profileId" exact>
              {PlayerProfile}
            </Route>
            <Route path="/island/profile" exact>
              {Profile}
            </Route>
            <Route path="/island/map" exact>
              {MapPage}
            </Route>
            <Route path="/island/citizens" exact>
              {CitizensPage}
            </Route>
            <Route path="/island/infrastructure" exact>
              {InfrastructurePage}
            </Route>
            <Route path="/island/resources" exact>
              {ResourcesPage}
            </Route>
            <Route path="/island/treasury" exact>
              {TreasuryPage}
            </Route>
            <Route path="/island/events" exact>
              {EventsPage}
            </Route>
            <Route path="/island/tiles/:position" exact>
              {TilePage}
            </Route>
            <Route path="/archipelago/overview" exact>
              {ArchipelagoOverview}
            </Route>
            <Route path="/archipelago/ranking" exact>
              {Ranking}
            </Route>
            <Route path="/market/prices" exact>
              {MarketPrices}
            </Route>
            <Route path="/market/history" exact>
              {MarketHistory}
            </Route>
            <Route path="/market/trade" exact>
              {TradePage}
            </Route>
            <Route path="/archipelago/search" exact>
              {SearchIslandsPage}
            </Route>
            <Route path="/archipelago/community" exact>
              {CommunityPage}
            </Route>
            <Route path="/citizen/:citizenId" exact>
              {CitizenPage}
            </Route>
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
  background: #fff;
  border-radius: 4px;

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

  @media all and (max-width: 699px) {
    min-height: 100%;
  }
`;

export default MainContent;
