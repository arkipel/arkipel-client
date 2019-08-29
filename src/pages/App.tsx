import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

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
  }

  render() {
    let menuBtn = (
      <a href="#" onClick={this.toggleLeftPane}>
        <img src={menu} alt="&#9776;" />
      </a>
    );

    return (
      <Router>
        <div id="app">
          {this.state.showLeftPane && (
            <Fragment>
              <div id="left-pane">
                <div className="top-bar">
                  <nav>{menuBtn}</nav>
                </div>
                <div className="scrollable">
                  <div id="menu">
                    <nav>
                      <h1>Main</h1>
                      <ul
                        onClick={() => {
                          this.toggleLeftPane();
                        }}
                      >
                        <li>
                          <NavLink exact to="/">
                            Home
                          </NavLink>
                        </li>
                        <li>
                          <NavLink exact to="/about">
                            About
                          </NavLink>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
              <div
                id="under-pane-shadow"
                onClick={() => {
                  this.setState({ showLeftPane: false });
                }}
              ></div>
            </Fragment>
          )}
          <div id="main">
            <div className="top-bar">
              <nav>{!this.state.showLeftPane && menuBtn}</nav>
            </div>
            <div className="scrollable">
              <div id="content">
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/about" exact component={About} />
              </div>
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
}

type props = {};

type state = {
  showLeftPane: boolean;
};

export default App;
