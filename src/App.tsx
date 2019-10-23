import React from 'react';
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
      showLeftPane: false,
    };

    // let breakpoints = {
    //   small: '(max-width: 499px)',
    //   medium: '(min-width: 500px) and (max-width: 699px)',
    //   large: '(min-width: 700px)',
    // };
  }

  render() {
    let invertColors = '';
    if (this.state.showLeftPane) {
      invertColors = 'invert-colors';
    }

    let menuBtn = (
      <div onClick={this.toggleLeftPane} className="button">
        <img src={menu} alt="&#9776;" className={invertColors} />
      </div>
    );

    let leftPaneClassName = this.state.showLeftPane ? 'visible' : '';

    return (
      <Router>
        <div id="top-bar-left" className="top-bar">
          <Media
            query="(max-width: 699px)"
            render={() => <nav>{menuBtn}</nav>}
          />
        </div>
        <div id="top-bar-right" className="top-bar"></div>
        <div id="left-pane" className={leftPaneClassName}>
          <div className="scrollable" style={{ marginTop: '50px' }}>
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
                    <NavLink exact to="/login" onClick={this.hideLeftPane}>
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
                    <NavLink exact to="/about" onClick={this.hideLeftPane}>
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
        <div id="main">
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
