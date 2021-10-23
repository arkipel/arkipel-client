import React, { Fragment } from 'react';

import arkipelLogo256 from '../assets/logo/arkipel_256.png';

const Home = () => {
  return (
    <Fragment>
      <h1>Home</h1>
      <div style={{ textAlign: 'center' }}>
        <img
          src={arkipelLogo256}
          alt="Arkipel logo (256 pixels)"
          height={128}
          width={128}
        />
      </div>
      <p>
        <i>
          Arkipel is a persistent browser-based game that takes place in a
          fictional archipelago called Arkipel. Players must manage and grow a
          small island to compete economically and politically against each
          other. The global market is built on the trust of currencies created
          by players.
        </i>
      </p>
      <small>
        This is not an idle game. Production won't grow exponentially and you
        don't need to leave your browser open to produce resources.
      </small>
      <h2>Work in progress</h2>
      <p>This is a work in progress. Important points:</p>
      <ul style={{ marginLeft: '20px' }}>
        <li>
          Food can be produced, but it is not consumed yet, so you don't need to
          have any.
        </li>
        <li>
          New players get the Early Player badge. This is a limited badge that
          won't be distributed in the future.
        </li>
        <li>Trading is buggy and a new version is coming out soon.</li>
      </ul>
    </Fragment>
  );
};

export default Home;
