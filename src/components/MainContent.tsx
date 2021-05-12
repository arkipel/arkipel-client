import React, { FunctionComponent, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Media from 'react-media';

import { SessionContext } from '../libs/session/session';

// Pages
import About from '../pages/About';
import Home from '../pages/Home';
import ArchipelagoOverview from '../pages/archipelago/Overview';
import SearchIslandsPage from '../pages/archipelago/Search';
import Profile from '../pages/island/Profile';
import MapPage from '../pages/island/Map';
import InfrastructurePage from '../pages/island/Infrastructure';
import ResourcesPage from '../pages/island/Resources';
import TreasuryPage from '../pages/island/Treasury';
import EventsPage from '../pages/island/Events';
import TilePage from '../pages/island/Tile';
import TradePage from '../pages/market/Trade';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import Settings from '../pages/account/Settings';

// Components
import APIStatus from '../components/APIStatus';
import Scrollable from '../ui/layout/Scrollable';

// Assets
import styles from './MainContent.scss';

const MainContent: FunctionComponent<props> = ({
  onMenuOpen,
  onNotificationOpen,
}) => {
  const session = useContext(SessionContext);

  return (
    <div className={styles.main}>
      <div className={styles.topBar}>
        <div>
          <Media
            query="(max-width: 699px)"
            render={() => (
              <div onClick={onMenuOpen} className="button">
                <img
                  src="https://icons.arkipel.io/ui/menu.svg"
                  alt="&#10092;"
                />
              </div>
            )}
          />
          {session.loggedIn && <span>{session.username}</span>}
        </div>
        <div>
          <APIStatus />
          <Media
            query="(max-width: 999px)"
            render={() => (
              <div onClick={onNotificationOpen} className="button">
                <img
                  src="https://icons.arkipel.io/ui/notification.svg"
                  alt="&#128276;"
                />
              </div>
            )}
          />
        </div>
      </div>
      <Scrollable>
        <div className={styles.content}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/login" exact component={Login} />
            <Route path="/registration" exact component={Registration} />
            <Route path="/account/settings" exact component={Settings} />
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
            <Route path="/market/trade" exact component={TradePage} />
            <Route
              path="/archipelago/search"
              exact
              component={SearchIslandsPage}
            />
          </Switch>
        </div>
      </Scrollable>
    </div>
  );
};

type props = {
  onMenuOpen: () => void;
  onNotificationOpen: () => void;
};

export default MainContent;
