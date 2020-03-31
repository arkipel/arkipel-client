import React, { Fragment } from 'react';

class InslandInfo extends React.PureComponent<props, state> {
  constructor(props: props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <h2>Information</h2>
        <p>Information about the island.</p>
      </Fragment>
    );
  }
}

type props = {};

type state = {};

export default InslandInfo;
