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
            fictional archipelago called Arkipel. Players buy and sell land,
            build infrastructure, trade resources and currencies, invest in
            research, and handle the politics while keeping the population under
            control in order to accumulate wealth and power.
          </i>
        </p>
        <p>
          <i>
            Anything that players want to trade can be traded, such as land,
            money, resources, votes, debt, etc. When a new account is created,
            nothing is given for free. A new player should seek help from an
            already existing player.
          </i>
        </p>
      </Fragment>
    );
  }
}

export default Home;
