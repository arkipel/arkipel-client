import React, { Fragment } from 'react';

class About extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <h1>About</h1>
        <p>Arkipel is a persistent browser-based game.</p>
        <h2>Source code</h2>
        <p>
          The source code can be found on the{' '}
          <a href="https://github.com/arkipel/arkipel-client">
            project's GitHub repository
          </a>
          . It has a GPL-3.0 license.
        </p>
      </Fragment>
    );
  }
}

export default About;
