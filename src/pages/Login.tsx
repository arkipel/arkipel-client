import React, { Fragment } from 'react';

class Login extends React.PureComponent<props, state> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <Fragment>
        <h1>Login</h1>
        <form onSubmit={this.submit}>
          <p>
            <input
              type="text"
              value={this.state.username}
              placeholder="Username"
              onChange={event => {
                this.setState({ username: event.target.value });
              }}
            />
          </p>
          <p>
            <input
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={event => {
                this.setState({ password: event.target.value });
              }}
            />
          </p>
          <p>
            <input
              type="submit"
              value="Log in"
              disabled={
                this.state.username === '' || this.state.password === ''
              }
            />
          </p>
        </form>
      </Fragment>
    );
  }

  submit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('This has not been implemented yet.');
  };
}

type props = {};

type state = {
  username: string;
  password: string;
};

export default Login;
