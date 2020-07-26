import React, { Fragment, FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import Media from 'react-media';

import { SessionContext } from '../libs/session/session';

// Pages
import About from '../pages/About';
import Home from '../pages/Home';
import ArchipelagoOverview from '../pages/archipelago/Overview';
import MapPage from '../pages/island/Map';
import TilePage from '../pages/island/Tile';
import IslandsPage from '../pages/islands/List';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import Settings from '../pages/account/Settings';

// Components
import Scrollable from '../ui/misc/Scrollable';

// Assets
import styles from './MainContent.scss';

const MainContent: FunctionComponent<props> = ({
  onMenuOpen,
  onNotificationOpen,
}) => {
  return (
    <div className={styles.main}>
      <div className={styles.topBar}>
        <SessionContext.Consumer>
          {(session) => {
            return (
              <Fragment>
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
                  {session.loggedIn && (
                    <button
                      onClick={() => {
                        session.logOut();
                      }}
                    >
                      Log out
                    </button>
                  )}
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
              </Fragment>
            );
          }}
        </SessionContext.Consumer>
      </div>
      <Scrollable>
        <div className={styles.content}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/login" exact component={Login} />
            <Route path="/registration" exact component={Registration} />
            <Route path="/account/settings" exact component={Settings} />
            <Route path="/island/map" exact component={MapPage} />
            <Route path="/island/tiles/:position" exact component={TilePage} />
            <Route
              path="/archipelago/overview"
              exact
              component={ArchipelagoOverview}
            />
            <Route path="/archipelago/islands" exact component={IslandsPage} />
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
