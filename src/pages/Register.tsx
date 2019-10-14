import React, { Fragment } from 'react';

class Register extends React.PureComponent<props, state> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordAgain: '',
    };
  }

  render() {
    return (
      <Fragment>
        <h1>Register</h1>
        <p className="msg-error">
          This game is still a work in progress. It is not currently possible to
          register.
        </p>
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
            {this.state.username.length > 0 && this.state.password.length < 4 && (
              <Fragment>
                <br />
                <span className="hint-error">not long enough</span>
              </Fragment>
            )}
            <br />
            <span className="hint">a-z, A-Z, 0-9, at least 4 characters</span>
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
            {this.state.password.length > 0 && this.state.password.length < 8 && (
              <Fragment>
                <br />
                <span className="hint-error">not long enough</span>
              </Fragment>
            )}
            <br />
            <span className="hint">at least 8 characters</span>
          </p>
          <p>
            <input
              type="password"
              value={this.state.passwordAgain}
              placeholder="Password again"
              onChange={event => {
                this.setState({ passwordAgain: event.target.value });
              }}
            />
            {this.state.passwordAgain.length > 0 &&
              this.state.password !== this.state.passwordAgain && (
                <Fragment>
                  <br />
                  <span className="hint-error">not the same</span>
                </Fragment>
              )}
            <br />
          </p>
          <p>
            <input type="submit" value="Register" disabled={true} />
          </p>
        </form>
      </Fragment>
    );
  }

  submit = (event: React.FormEvent) => {
    console.log('This has not been implemented yet.');
    event.preventDefault();
  };
}

type props = {};

type state = {
  username: string;
  password: string;
  passwordAgain: string;
};

export default Register;
