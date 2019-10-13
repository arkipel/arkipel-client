import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Media from 'react-media';

// Pages
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';

// Assets
import './styles/index.scss';
import menu from './assets/icons/menu.png';

class App extends React.PureComponent<props, state> {
  constructor(props: any) {
    super(props);

    this.state = {
      showLeftPane: false,
    };

    // let breakpoints = {
    //   small: '(max-width: 399px)',
    //   medium: '(min-width: 400px) and (max-width: 699px)',
    //   large: '(min-width: 700px)',
    // };
  }

  render() {
    let menuBtn = (
      <button onClick={this.toggleLeftPane}>
        <img src={menu} alt="&#9776;" />
      </button>
    );

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
                <div id="left-pane">
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
                              to="/about"
                              onClick={this.hideLeftPane}
                            >
                              About
                            </NavLink>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
                <div id="under-pane-shadow" onClick={this.hideLeftPane}></div>
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
