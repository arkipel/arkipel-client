import React, { Fragment } from 'react';

import arkipelLogo256 from '../assets/logo/arkipel_256.png';

class Home extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <h1>Home</h1>
        <div style={{ textAlign: 'center' }}>
          <img
            src={arkipelLogo256}
            alt="Arkipel logo (256 pixels)"
            height={80}
            width={80}
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
      </Fragment>
    );
  }
}

export default Home;
