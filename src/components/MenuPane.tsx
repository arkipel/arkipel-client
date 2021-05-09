import React, { Fragment, FunctionComponent, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Media from 'react-media';

import { SessionContext } from '../libs/session/session';

// Components
import Scrollable from '../ui/layout/Scrollable';

// Assets
import menuPaneStyles from './MenuPane.scss';

const MenuPane: FunctionComponent<props> = ({ visible, onCloseClick }) => {
  const session = useContext(SessionContext);

  let menuPaneClassName = visible ? menuPaneStyles.visible + ' ' : '';
  menuPaneClassName += menuPaneStyles.menuPane;

  return (
    <div className={menuPaneClassName}>
      <div className={menuPaneStyles.topBar}>
        <div>
          <Media
            query="(max-width: 699px)"
            render={() => (
              <div onClick={onCloseClick} className="button">
                <img
                  src="https://icons.arkipel.io/ui/arrow_left.svg"
                  alt="&#10092;"
                />
              </div>
            )}
          />
        </div>
      </div>
      <Scrollable>
        <div className={menuPaneStyles.menu}>
          <nav>
            {session.loggedIn && (
              <Fragment>
                <h1>Island</h1>
                <ul>
                  <li>
                    <NavLink exact to="/island/profile" onClick={onCloseClick}>
                      <img src="https://icons.arkipel.io/menu/profile.svg" />
                      <span>Profile</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/island/map" onClick={onCloseClick}>
                      <img src="https://icons.arkipel.io/menu/map.svg" />
                      <span>Map</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      exact
                      to="/island/infrastructure"
                      onClick={onCloseClick}
                    >
                      <img src="https://icons.arkipel.io/menu/infrastructure.svg" />
                      <span>Infrastructure</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      exact
                      to="/island/resources"
                      onClick={onCloseClick}
                    >
                      <img src="https://icons.arkipel.io/menu/resources.svg" />
                      <span>Resources</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/island/treasury" onClick={onCloseClick}>
                      <img src="https://icons.arkipel.io/menu/treasury.svg" />
                      <span>Treasury</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/island/events" onClick={onCloseClick}>
                      <img src="https://icons.arkipel.io/menu/events.svg" />
                      <span>Events</span>
                    </NavLink>
                  </li>
                </ul>
              </Fragment>
            )}
            <h1>Market</h1>
            <ul>
              <li>
                <NavLink exact to="/market/prices" onClick={onCloseClick}>
                  <img src="https://icons.arkipel.io/menu/prices.svg" />
                  <span>Prices</span>
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/market/trade" onClick={onCloseClick}>
                  <img src="https://icons.arkipel.io/menu/trade.svg" />
                  <span>Trade</span>
                </NavLink>
              </li>
            </ul>
            <h1>Archipelago</h1>
            <ul>
              <li>
                <NavLink
                  exact
                  to="/archipelago/overview"
                  onClick={onCloseClick}
                >
                  <img src="https://icons.arkipel.io/menu/overview.svg" />
                  <span>Overview</span>
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/archipelago/search" onClick={onCloseClick}>
                  <img src="https://icons.arkipel.io/menu/search.svg" />
                  <span>Search</span>
                </NavLink>
              </li>
            </ul>
            {session.loggedIn && (
              <Fragment>
                <h1>Account</h1>
                <ul>
                  <li>
                    <NavLink
                      exact
                      to="/account/settings"
                      onClick={onCloseClick}
                    >
                      <img src="https://icons.arkipel.io/menu/settings.svg" />
                      <span>Settings</span>
                    </NavLink>
                  </li>
                </ul>
              </Fragment>
            )}
            <h1>Main</h1>
            <ul>
              <li>
                <NavLink exact to="/" onClick={onCloseClick}>
                  <img src="https://icons.arkipel.io/menu/home.svg" />
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/login" onClick={onCloseClick}>
                  <img src="https://icons.arkipel.io/menu/login.svg" />
                  <span>Login</span>
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/registration" onClick={onCloseClick}>
                  <img src="https://icons.arkipel.io/menu/register.svg" />
                  <span>Register</span>
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/about" onClick={onCloseClick}>
                  <img src="https://icons.arkipel.io/menu/about.svg" />
                  <span>About</span>
                </NavLink>
              </li>
            </ul>
          </nav>
          <footer>
            {session.loggedIn && (
              <p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    session.logOut();
                  }}
                >
                  Log out
                </a>
              </p>
            )}
            <p>
              Made by <a href="https://mfcl.io">mfcl</a>.
            </p>
          </footer>
        </div>
      </Scrollable>
    </div>
  );
};

type props = {
  visible: boolean;
  onCloseClick: () => void;
};

export default MenuPane;
