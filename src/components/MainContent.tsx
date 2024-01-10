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
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/account/settings" element={<Settings />} />
            <Route path="/profile/:profileId" element={<PlayerProfile />} />
            <Route path="/island/profile" element={<Profile />} />
            <Route path="/island/map" element={<MapPage />} />
            <Route path="/island/citizens" element={<CitizensPage />} />
            <Route
              path="/island/infrastructure"
              element={<InfrastructurePage />}
            />
            <Route path="/island/resources" element={<ResourcesPage />} />
            <Route path="/island/treasury" element={<TreasuryPage />} />
            <Route path="/island/events" element={<EventsPage />} />
            <Route path="/island/tiles/:position" element={<TilePage />} />
            <Route
              path="/archipelago/overview"
              element={<ArchipelagoOverview />}
            />
            <Route path="/archipelago/ranking" element={<Ranking />} />
            <Route path="/market/prices" element={<MarketPrices />} />
            <Route path="/market/history" element={<MarketHistory />} />
            <Route path="/market/trade" element={<TradePage />} />
            <Route path="/archipelago/search" element={<SearchIslandsPage />} />
            <Route path="/archipelago/community" element={<CommunityPage />} />
            <Route path="/citizen/:citizenId" element={<CitizenPage />} />
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
  // background: #fff;
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
