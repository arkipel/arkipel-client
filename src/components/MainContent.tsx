import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
          <Routes>
            <Route path="/">{Home}</Route>
            <Route path="/about">{About}</Route>
            <Route path="/login">{Login}</Route>
            <Route path="/registration">{Registration}</Route>
            <Route path="/account/settings">{Settings}</Route>
            <Route path="/profile/:profileId">{PlayerProfile}</Route>
            <Route path="/island/profile">{Profile}</Route>
            <Route path="/island/map">{MapPage}</Route>
            <Route path="/island/citizens">{CitizensPage}</Route>
            <Route path="/island/infrastructure">{InfrastructurePage}</Route>
            <Route path="/island/resources">{ResourcesPage}</Route>
            <Route path="/island/treasury">{TreasuryPage}</Route>
            <Route path="/island/events">{EventsPage}</Route>
            <Route path="/island/tiles/:position">{TilePage}</Route>
            <Route path="/archipelago/overview">{ArchipelagoOverview}</Route>
            <Route path="/archipelago/ranking">{Ranking}</Route>
            <Route path="/market/prices">{MarketPrices}</Route>
            <Route path="/market/history">{MarketHistory}</Route>
            <Route path="/market/trade">{TradePage}</Route>
            <Route path="/archipelago/search">{SearchIslandsPage}</Route>
            <Route path="/archipelago/community">{CommunityPage}</Route>
            <Route path="/citizen/:citizenId">{CitizenPage}</Route>
          </Routes>
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
