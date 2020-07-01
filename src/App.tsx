import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';
import Media from 'react-media';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

import { SessionProvider, SessionContext } from './libs/session/session';

// Config
import { arkipelEndpoint } from 'Config';

// Pages
import About from './pages/About';
import Home from './pages/Home';
import IslandPage from './pages/islands/Island';
import IslandsPage from './pages/islands/List';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Settings from './pages/account/Settings';

// Assets
import './styles/index.scss';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: arkipelEndpoint,
    credentials: 'include',
  }),
});

class App extends React.PureComponent<props, state> {
  constructor(props: any) {
    super(props);

    this.state = {
      showMenuPane: true,
    };

    // let breakpoints = {
    //   small: '(max-width: 499px)',
    //   medium: '(min-width: 500px) and (max-width: 699px)',
    //   large: '(min-width: 700px)',
    // };
  }

  render() {
    // let invertColors = '';
    let underPaneShadow = '';
    if (this.state.showMenuPane) {
      // invertColors = 'invert-colors';
      underPaneShadow = 'visible';
    }

    let menuPaneClassName = this.state.showMenuPane ? 'visible' : '';

    return (
      <ApolloProvider client={client}>
        <SessionProvider>
          <Router>
            <div id="menu-pane" className={menuPaneClassName}>
              <div id="top-bar-left" className="top-bar">
                <div>
                  <Media
                    query="(max-width: 699px)"
                    render={() => (
                      <div onClick={this.closeMenuPane} className="button">
                        <img
                          src="https://icons.arkipel.io/ui/arrow_left.svg"
                          alt="&#10092;"
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="scrollable">
                <div id="menu">
                  <nav>
                    <h1>Archipelago</h1>
                    <ul>
                      <li>
                        <NavLink
                          exact
                          to="/archipelago/islands"
                          onClick={this.closeMenuPane}
                        >
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
                                    onClick={this.closeMenuPane}
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
                        <NavLink exact to="/" onClick={this.closeMenuPane}>
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink exact to="/login" onClick={this.closeMenuPane}>
                          Login
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          exact
                          to="/registration"
                          onClick={this.closeMenuPane}
                        >
                          Register
                        </NavLink>
                      </li>
                      <li>
                        <NavLink exact to="/about" onClick={this.closeMenuPane}>
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
            <Media query="(max-width: 699px)">
              <div
                id="under-pane-shadow"
                className={underPaneShadow}
                onClick={this.closeMenuPane}
              />
            </Media>
            <div id="main">
              <div id="top-bar-right" className="top-bar">
                <SessionContext.Consumer>
                  {(session) => {
                    return (
                      <Fragment>
                        <div>
                          <Media
                            query="(max-width: 699px)"
                            render={() => (
                              <div
                                onClick={this.openMenuPane}
                                className="button"
                              >
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
                        </div>
                      </Fragment>
                    );
                  }}
                </SessionContext.Consumer>
              </div>
              <div className="scrollable">
                <div id="content">
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" exact component={About} />
                    <Route path="/login" exact component={Login} />
                    <Route
                      path="/registration"
                      exact
                      component={Registration}
                    />
                    <Route
                      path="/account/settings"
                      exact
                      component={Settings}
                    />
                    <Route
                      path="/archipelago/islands"
                      exact
                      component={IslandsPage}
                    />
                    <Route
                      path="/archipelago/islands/:islandID"
                      component={IslandPage}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </Router>
        </SessionProvider>
      </ApolloProvider>
    );
  }

  openMenuPane = () => {
    this.setState(() => {
      return { showMenuPane: true };
    });
  };

  closeMenuPane = () => {
    this.setState(() => {
      return { showMenuPane: false };
    });
  };
}

type props = {};

type state = {
  showMenuPane: boolean;
};

export default App;
