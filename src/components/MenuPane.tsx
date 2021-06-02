import React, { Fragment, FunctionComponent, useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Media from 'react-media';

import { SessionContext } from '../libs/session/session';

// Components
import Scrollable from '../ui/layout/Scrollable';
import { TopBar, Box } from '../ui/layout/TopBar';

const MenuPane: FunctionComponent<props> = ({ visible, onCloseClick }) => {
  const session = useContext(SessionContext);

  let menuPaneClassName = visible ? 'visible ' : '';

  // To hide the pane, move
  // it to the right.
  let translateX = '0';
  if (!visible) {
    translateX = '-200px';
  }

  let styleVars = { '--translateX': translateX } as React.CSSProperties;

  return (
    <Style style={styleVars} className={menuPaneClassName}>
      <TopBar background="rgba(0, 0, 0, 0.14)">
        <div>
          <Media
            query="(max-width: 699px)"
            render={() => (
              <Box onClick={onCloseClick}>
                <img
                  style={{
                    transition: '0.2s linear',
                    filter: 'invert(100%)',
                    opacity: '20%',
                  }}
                  src="https://icons.arkipel.io/ui/arrow_left.svg"
                  alt="&#10092;"
                />
              </Box>
            )}
          />
        </div>
      </TopBar>
      <Scrollable>
        <MenuStyle>
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
        </MenuStyle>
      </Scrollable>
    </Style>
  );
};

type props = {
  visible: boolean;
  onCloseClick: () => void;
};

const Style = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-column: 1;
  grid-row: 1;
  min-height: 0;
  height: 100%;
  width: 200px;
  color: white;
  background: #264653;
  z-index: 100;
  transform: translateX(var(--translateX));
  scrollbar-width: thin;
  scrollbar-color: #1e3742 #264653;

  footer {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    padding: 10px;
    color: rgba(255, 255, 255, 0.2);
    text-align: center;
    font-size: 12px;

    a {
      color: rgba(255, 255, 255, 0.3);
    }

    button {
      padding: 0;
      text-decoration: underline;
      background: none;
    }
  }

  a {
    color: #fff;
  }

  @media all and (max-width: 699px) {
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }

  @media all and (min-width: 700px) {
    transform: translateX(0 - var(--translateX));
  }

  &.visible {
    transform: translateX(0);

    @media all and (max-width: 699px) {
      box-shadow: 1px 0 10px #111;
    }
  }
`;

const MenuStyle = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 1fr auto;

  h1 {
    display: block;
    padding: 10px;
    font-size: 28px;
  }

  nav a {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 6px;
    padding: 10px;
    font-size: 18px;
    text-decoration: none;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }

    &.active {
      background: rgba(0, 0, 0, 0.2);
    }

    img {
      width: 20px;
      height: 20px;
      filter: invert(1);
      opacity: 0.4;
    }
  }
`;

export default MenuPane;
