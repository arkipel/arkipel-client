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
            <button>Log in</button>
          </p>
        </form>
      </Fragment>
    );
  }

  submit = (event: React.FormEvent) => {
    console.log(
      `Logging in '${this.state.username}' with password '${this.state.password}'...`,
    );
    event.preventDefault();
  };
}

type props = {};

type state = {
  username: string;
  password: string;
};

export default Login;
