import React, { Fragment } from 'react';

const Home = () => {
  return (
    <Fragment>
      <h1>Arkipel</h1>
      <p>
        Welcome to Arkipel, a management game that takes place in an
        archipelago. Players control and develop their own island while trading
        with others.
      </p>
      <p>
        Learn more about the development of the game on{' '}
        <a href="https://patreon.com/arkipel" target="_blank">
          Arkipel's Patreon page
        </a>
        .
      </p>
    </Fragment>
  );
};

export default Home;
