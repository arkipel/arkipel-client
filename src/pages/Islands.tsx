import React, { Fragment } from 'react';

import { ClientContext } from '../libs/jsonapi/client';

class Islands extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <h1>Islands</h1>
        <p className="msg-error">Work in progress.</p>
        <ClientContext.Consumer>
          {context => (
            <Fragment>
              {context.test}
              abcdefghijklmnopqrstuvwxyz
              <i>abcdefghijklmnopqrstuvwxyz</i>
              <b>abcdefghijklmnopqrstuvwxyz</b>
            </Fragment>
          )}
        </ClientContext.Consumer>
      </Fragment>
    );
  }
}

export default Islands;
