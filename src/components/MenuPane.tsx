import React, { Fragment, FunctionComponent, useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { SessionContext } from '../libs/session/session';

// Components
import Scrollable from '../ui/layout/Scrollable';

const MenuPane: FunctionComponent<props> = ({ visible, onCloseClick }) => {
  const session = useContext(SessionContext);

  let menuPaneClassName = visible ? 'visible ' : '';

  // To hide the pane, move
  // it to the right.
  let display = 'grid';
  if (!visible) {
    display = 'none';
  }

  let styleVars = { '--display': display } as React.CSSProperties;

  return (
    <StyledMenuPane style={styleVars} className={menuPaneClassName}>
      <Scrollable>
        <StyledMenu>
          <nav>
            {session.loggedIn && (
              <Fragment>
                <h1>Island</h1>
                <ul>
                  <li>
                    <NavLink end to="/island/profile" onClick={onCloseClick}>
                      <img src="https://icons.arkipel.io/menu/profile.svg" />
                      <span>Profile</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink end to="/island/map" onClick={onCloseClick}>
                      <img src="https://icons.arkipel.io/menu/map.svg" />
                      <span>Map</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink end to="/island/citizens" onClick={onCloseClick}>
                      <img src="https://icons.arkipel.io/menu/citizens.svg" />
                      <span>Citizens</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      end
                      to="/island/infrastructure"
                      onClick={onCloseClick}
                    >
                      <img src="https://icons.arkipel.io/menu/infrastructure.svg" />
                      <span>Infrastructure</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink end to="/island/resources" onClick={onCloseClick}>
                      <img src="https://icons.arkipel.io/menu/resources.svg" />
                      <span>Resources</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink end to="/island/treasury" onClick={onCloseClick}>
                      <img src="https://icons.arkipel.io/menu/treasury.svg" />
                      <span>Treasury</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink end to="/island/events" onClick={onCloseClick}>
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
                <NavLink end to="/market/prices" onClick={onCloseClick}>
                  <img src="https://icons.arkipel.io/menu/market_prices.svg" />
                  <span>Prices</span>
                </NavLink>
              </li>
              <li>
                <NavLink end to="/market/history" onClick={onCloseClick}>
                  <img src="https://icons.arkipel.io/menu/market_history.svg" />
                  <span>History</span>
                </NavLink>
              </li>
              <li>
                <NavLink end to="/market/trade" onClick={onCloseClick}>
                  <img src="https://icons.arkipel.io/menu/trade.svg" />
                  <span>Trade</span>
                </NavLink>
              </li>
            </ul>
            <h1>Archipelago</h1>
            <ul>
              <li>
                <NavLink end to="/archipelago/overview" onClick={onCloseClick}>
                  <img src="https://icons.arkipel.io/menu/overview.svg" />
                  <span>Overview</span>
                </NavLink>
              </li>
              <li>
                <NavLink end to="/archipelago/ranking" onClick={onCloseClick}>
                  <img src="https://icons.arkipel.io/menu/ranking.svg" />
                  <span>Ranking</span>
                </NavLink>
              </li>
              <li>
                <NavLink end to="/archipelago/search" onClick={onCloseClick}>
                  <img src="https://icons.arkipel.io/menu/search.svg" />
                  <span>Search</span>
                </NavLink>
              </li>
              <li>
                <NavLink end to="/archipelago/community" onClick={onCloseClick}>
                  <img src="https://icons.arkipel.io/menu/community.svg" />
                  <span>Community</span>
                </NavLink>
              </li>
            </ul>
            {session.loggedIn && (
              <Fragment>
                <h1>Account</h1>
                <ul>
                  <li>
                    <NavLink end to="/account/settings" onClick={onCloseClick}>
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
                <NavLink end to="/" onClick={onCloseClick}>
                  <img src="https://icons.arkipel.io/menu/home.svg" />
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink end to="/login" onClick={onCloseClick}>
                  <img src="https://icons.arkipel.io/menu/login.svg" />
                  <span>Login</span>
                </NavLink>
              </li>
              <li>
                <NavLink end to="/registration" onClick={onCloseClick}>
                  <img src="https://icons.arkipel.io/menu/register.svg" />
                  <span>Register</span>
                </NavLink>
              </li>
              <li>
                <NavLink end to="/about" onClick={onCloseClick}>
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
        </StyledMenu>
      </Scrollable>
    </StyledMenuPane>
  );
};

type props = {
  visible: boolean;
  onCloseClick: () => void;
};

const StyledMenuPane = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-column: 1;
  grid-row: 1;
  min-height: 0;
  height: 100%;
  width: 200px;
  // background: #ede7d4;

  footer {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    padding: 10px;
    color: rgba(0, 0, 0, 0.3);
    text-align: center;
    font-size: 12px;

    a {
      color: rgba(0, 0, 0, 0.4);
    }

    button {
      padding: 0;
      text-decoration: underline;
      background: none;
    }
  }

  a {
    color: rgba(49, 55, 71, 0.6);
  }

  @media all and (max-width: 699px) {
    display: var(--display);
    z-index: 110;
  }

  @media all and (min-width: 700px) {
    transform: translateX(0 - var(--translateX));
  }
`;

const StyledMenu = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 1fr auto;

  h1 {
    display: block;
    padding: 10px;
    font-size: 28px;
    text-decoration: underline;
    color: rgba(0, 0, 0, 0.8);
  }

  ul li {
    display: block;
  }

  nav a {
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr;
    gap: 6px;
    padding: 10px;
    font-size: 18px;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.6);

    &.active,
    &:hover {
      color: rgba(0, 0, 0, 0.9);

      img {
        opacity: 0.9;
      }
    }

    img {
      width: 20px;
      height: 20px;
      opacity: 0.6;
    }
  }
`;

export default MenuPane;
