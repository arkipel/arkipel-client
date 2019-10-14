import React, { Fragment } from 'react';

class Registration extends React.PureComponent<props, state> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordAgain: '',
      usernameErrors: '',
      passwordErrors: '',
      passwordAgainErrors: '',
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
                this.setState({ username: event.target.value }, () => {
                  this.checkInputs();
                });
              }}
            />
            {this.state.usernameErrors !== '' && (
              <Fragment>
                <br />
                <span className="hint-error">{this.state.usernameErrors}</span>
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
                this.setState({ password: event.target.value }, () => {
                  this.checkInputs();
                });
              }}
            />
            {this.state.passwordErrors !== '' && (
              <Fragment>
                <br />
                <span className="hint-error">{this.state.passwordErrors}</span>
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
                this.setState({ passwordAgain: event.target.value }, () => {
                  this.checkInputs();
                });
              }}
            />
            {this.state.passwordAgainErrors !== '' && (
              <Fragment>
                <br />
                <span className="hint-error">
                  {this.state.passwordAgainErrors}
                </span>
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

  checkInputs = () => {
    // Username
    let usernameErrors: Array<string> = [];
    if (this.state.username.length > 0) {
      if (this.state.username.length < 4) {
        usernameErrors.push('not long enough');
      }
      if (this.state.username.match(/[^a-zA-Z0-9]+/)) {
        usernameErrors.push('invalid characters');
      }
    }

    // Password
    let passwordErrors: Array<string> = [];
    if (this.state.password.length > 0) {
      if (this.state.password.length < 8) {
        passwordErrors.push('not long enough');
      }
    }

    // Password (again)
    let passwordAgainErrors: Array<string> = [];
    if (this.state.passwordAgain.length > 0) {
      if (this.state.password !== this.state.passwordAgain) {
        passwordAgainErrors.push('not the same');
      }
    }

    this.setState({
      usernameErrors: usernameErrors.join(', '),
      passwordErrors: passwordErrors.join(', '),
      passwordAgainErrors: passwordAgainErrors.join(', '),
    });
  };

  submit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('This has not been implemented yet.');
  };
}

type props = {};

type state = {
  username: string;
  password: string;
  passwordAgain: string;
  usernameErrors: string;
  passwordErrors: string;
  passwordAgainErrors: string;
};

export default Registration;
