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
                    <NavLink exact to="/island/map" onClick={onCloseClick}>
                      Map
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      exact
                      to="/island/infrastructure"
                      onClick={onCloseClick}
                    >
                      Infrastructure
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      exact
                      to="/island/resources"
                      onClick={onCloseClick}
                    >
                      Resources
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/island/treasury" onClick={onCloseClick}>
                      Treasury
                    </NavLink>
                  </li>
                </ul>
              </Fragment>
            )}
            <h1>Archipelago</h1>
            <ul>
              <li>
                <NavLink
                  exact
                  to="/archipelago/overview"
                  onClick={onCloseClick}
                >
                  Overview
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
                      Settings
                    </NavLink>
                  </li>
                </ul>
              </Fragment>
            )}
            <h1>Main</h1>
            <ul>
              <li>
                <NavLink exact to="/" onClick={onCloseClick}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/login" onClick={onCloseClick}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/registration" onClick={onCloseClick}>
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/about" onClick={onCloseClick}>
                  About
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
