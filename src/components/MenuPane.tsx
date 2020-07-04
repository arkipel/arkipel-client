import React, { Fragment, FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import Media from 'react-media';

import { SessionContext } from '../libs/session/session';

// Assets
import appStyles from '../App.scss';
import menuPaneStyles from './MenuPane.scss';
import topBarStyles from '../styles/top-bar.scss';

const MenuPane: FunctionComponent<props> = ({ visible, onCloseClick }) => {
  let menuPaneClassName = visible ? menuPaneStyles.visible + ' ' : '';
  menuPaneClassName += menuPaneStyles.menuPane;

  return (
    <div className={menuPaneClassName}>
      <div className={topBarStyles.topBar + ' ' + topBarStyles.topBarLeft}>
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
      <div className={appStyles.scrollable}>
        <div className={menuPaneStyles.menu}>
          <nav>
            <h1>Archipelago</h1>
            <ul>
              <li>
                <NavLink exact to="/archipelago/islands" onClick={onCloseClick}>
                  Islands
                </NavLink>
              </li>
            </ul>
            <SessionContext.Consumer>
              {(session) => {
                if (session.loggedIn) {
                  return (
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
                  );
                }
                return <></>;
              }}
            </SessionContext.Consumer>
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
            <p>
              Made by <a href="https://mfcl.io">mfcl</a>.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

type props = {
  visible: boolean;
  onCloseClick: () => void;
};

export default MenuPane;
