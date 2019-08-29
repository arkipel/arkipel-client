import React, { Fragment } from 'react';

class Login extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <h1>Login</h1>
        <form>
          <input type="text" />
          <input type="password" />
        </form>
      </Fragment>
    );
  }
}

export default Login;
