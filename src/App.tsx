import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';
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
      showMenuPane: false,
    };

    // let breakpoints = {
    //   small: '(max-width: 499px)',
    //   medium: '(min-width: 500px) and (max-width: 699px)',
    //   large: '(min-width: 700px)',
    // };
  }

  render() {
    let invertColors = '';
    let underPaneShadow = '';
    if (this.state.showMenuPane) {
      invertColors = 'invert-colors';
      underPaneShadow = 'visible';
    }

    let menuBtn = (
      <div onClick={this.toggleMenuPane} className="button">
        <img src={menu} alt="&#9776;" className={invertColors} />
      </div>
    );

    let menuPaneClassName = this.state.showMenuPane ? 'visible' : '';

    return (
      <Router>
        <div id="top-bar-left" className="top-bar">
          <Media
            query="(max-width: 699px)"
            render={() => <nav>{menuBtn}</nav>}
          />
        </div>
        <div id="top-bar-right" className="top-bar"></div>
        <div id="menu-pane" className={menuPaneClassName}>
          <div className="scrollable" style={{ marginTop: '50px' }}>
            <div id="menu">
              <nav>
                <h1>Main</h1>
                <ul>
                  <li>
                    <NavLink exact to="/" onClick={this.hideMenuPane}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/login" onClick={this.hideMenuPane}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      exact
                      to="/registration"
                      onClick={this.hideMenuPane}
                    >
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/about" onClick={this.hideMenuPane}>
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
        <div
          id="under-pane-shadow"
          className={underPaneShadow}
          onClick={this.hideMenuPane}
        ></div>
        <div id="main">
          <div className="scrollable">
            <div id="content">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={About} />
                <Route path="/login" exact component={Login} />
                <Route path="/registration" exact component={Registration} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }

  toggleMenuPane = () => {
    this.setState((state) => {
      let showMenuPane = !state.showMenuPane;
      return { showMenuPane };
    });
  };

  hideMenuPane = () => {
    this.setState({ showMenuPane: false });
  };
}

type props = {};

type state = {
  showMenuPane: boolean;
};

export default App;
