import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Media from 'react-media';

// Pages
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';

// Assets
import './styles/index.scss';
import menu from './assets/icons/menu.png';

class App extends React.PureComponent<props, state> {
  constructor(props: any) {
    super(props);

    this.state = {
      showLeftPane: true,
    };

    // let breakpoints = {
    //   small: '(max-width: 499px)',
    //   medium: '(min-width: 500px) and (max-width: 699px)',
    //   large: '(min-width: 700px)',
    // };
  }

  render() {
    let menuBtn = (
      <button onClick={this.toggleLeftPane}>
        <img src={menu} alt="&#9776;" />
      </button>
    );

    let leftPaneClassName = this.state.showLeftPane ? 'visible' : '';

    return (
      <Router>
        <Media
          query="(min-width: 700px)"
          onChange={match => {
            if (match) {
              this.hideLeftPane();
            }
          }}
        >
          {match =>
            (match || this.state.showLeftPane) && (
              <Fragment>
                <div id="left-pane" className={leftPaneClassName}>
                  <div className="top-bar">
                    {!match && <nav>{menuBtn}</nav>}
                  </div>
                  <div className="scrollable">
                    <div id="menu">
                      <nav>
                        <h1>Main</h1>
                        <ul>
                          <li>
                            <NavLink exact to="/" onClick={this.hideLeftPane}>
                              Home
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              exact
                              to="/login"
                              onClick={this.hideLeftPane}
                            >
                              Login
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              exact
                              to="/registration"
                              onClick={this.hideLeftPane}
                            >
                              Register
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              exact
                              to="/about"
                              onClick={this.hideLeftPane}
                            >
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
                {this.state.showLeftPane && (
                  <div id="under-pane-shadow" onClick={this.hideLeftPane}></div>
                )}
              </Fragment>
            )
          }
        </Media>
        <div id="main">
          <div className="top-bar">
            <Media
              query="(max-width: 699px)"
              render={() => <nav>{!this.state.showLeftPane && menuBtn}</nav>}
            />
          </div>
          <div className="scrollable">
            <div id="content">
              <Route path="/" exact component={Home} />
              <Route path="/about" exact component={About} />
              <Route path="/login" exact component={Login} />
              <Route path="/registration" exact component={Registration} />
            </div>
          </div>
        </div>
      </Router>
    );
  }

  toggleLeftPane = () => {
    this.setState(state => {
      let showLeftPane = !state.showLeftPane;
      return { showLeftPane };
    });
  };

  hideLeftPane = () => {
    this.setState({ showLeftPane: false });
  };
}

type props = {};

type state = {
  showLeftPane: boolean;
};

export default App;
