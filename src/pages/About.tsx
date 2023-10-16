import React, { Fragment } from 'react';

const About = () => {
  return (
    <Fragment>
      <h1>About</h1>
      <p>
        Arkipel is a game made by <a href="https://mfcl.io">mfcl</a>.
      </p>
      <h2>Development</h2>
      <p>
        You can read posts about the development of the game on{' '}
        <a href="https://patreon.com/arkipel" target="_blank">
          Arkipel's Patreon page
        </a>
        .
      </p>
      <h2>Source code</h2>
      <p>
        The source code of this app can be found on the{' '}
        <a href="https://github.com/arkipel/arkipel-client">
          project's GitHub repository
        </a>
        . It has a GPL-3.0 license.
      </p>
    </Fragment>
  );
};

export default About;
