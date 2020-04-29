import React, { Fragment, useState } from 'react';

import { useQuery, gql, useMutation } from '@apollo/client';

import { debounce } from 'lodash';

import HCaptcha from '@hcaptcha/react-hcaptcha';

const Registration = () => {
  const [username, setUsername] = useState('testusername');
  const [password, setPassword] = useState('testpassword');
  const [passwordAgain, setPasswordAgain] = useState('testpassword');

  let { loading: checkingUsername, error, data } = useQuery(
    gql`
      query checkUsernameAvailability($username: String!) {
        checkUsernameAvailability(username: $username)
      }
    `,
    { variables: { username } },
  );
  if (checkingUsername) {
    console.log('checking username');
  }
  if (error) {
    console.log('got error', error);
  }
  let checkUsernameAvailability = true;
  if (data) {
    console.log('got data', data);
    checkUsernameAvailability = data.checkUsernameAvailability;
  }

  const checkInputs = () => {};

  // const checkUsernameAvailability = debounce((username: string) => {}, 400);

  const onVerifyCaptcha = (captcha: string) => {};

  const onExpireCaptcha = () => {};

  const onErrorCaptcha = () => {};

  const submit = (event: React.FormEvent) => {};

  return (
    <Fragment>
      <h1>Register</h1>
      <p className="msg-error">
        This game is still a work in progress. You should expect bugs and an
        incomplete gameplay.
      </p>
      <form onSubmit={submit}>
        <p>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(event) => {
              setUsername(event.target.value);
              checkUsernameAvailability(username);
              checkInputs();
            }}
          />
          {checkingUsername === true && (
            <Fragment>
              <br />
              <span className="hint-error">checking availability...</span>
            </Fragment>
          )}
          {checkUsernameAvailability === false && (
            <Fragment>
              <br />
              <span className="hint-error">username already taken</span>
            </Fragment>
          )}
          {/* <span className="hint-error">{usernameErrors}</span> */}
          <br />
          <span className="hint">a-z, A-Z, 0-9, 4-20 characters</span>
        </p>
        <p>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
              checkInputs();
            }}
          />
          {/* {passwordErrors !== '' && (
            <Fragment>
              <br />
              <span className="hint-error">{passwordErrors}</span>
            </Fragment>
          )} */}
          <br />
          <span className="hint">at least 8 characters</span>
        </p>
        <p>
          <input
            type="password"
            value={passwordAgain}
            placeholder="Password again"
            onChange={(event) => {
              setPasswordAgain(event.target.value);
              checkInputs();
            }}
          />
          {/* {passwordAgainErrors !== '' && (
            <Fragment>
              <br />
              <span className="hint-error">{passwordAgainErrors}</span>
            </Fragment>
          )} */}
          <br />
          <span className="hint">same password</span>
        </p>
        <HCaptcha
          sitekey="10000000-ffff-ffff-ffff-000000000001"
          // sitekey="36cde9f3-38a3-4fd7-9314-bac28f55545b"
          // onVerify={this.onVerifyCaptcha}
          // onExpire={this.onExpireCaptcha}
          // onError={this.onErrorCaptcha}
        ></HCaptcha>
        <p>
          <input type="submit" value="Register" disabled={false} />
        </p>
      </form>
    </Fragment>
  );
};

// class Registration extends React.PureComponent<props, state> {
//   constructor(props: any) {
//     super(props);

//     this.state = {
//       username: 'testusername',
//       password: 'testpassword',
//       passwordAgain: 'testpassword',
//       knownAvailableUsernames: new Array<string>(),
//       knownExistingUsernames: new Array<string>(),
//       usernameErrors: '',
//       passwordErrors: '',
//       passwordAgainErrors: '',
//       captcha: '',
//       termsAccepted: true,
//       allowSubmit: false,
//     };
//   }

//   render() {
//     return (
//       <Fragment>
//         <h1>Register</h1>
//         <p className="msg-error">
//           This game is still a work in progress. You should expect bugs and an
//           incomplete gameplay.
//         </p>
//         <form onSubmit={this.submit}>
//           <p>
//             <input
//               type="text"
//               value={this.state.username}
//               placeholder="Username"
//               onChange={(event) => {
//                 let username = event.target.value;
//                 this.setState({ username }, () => {
//                   this.checkUsernameAvailability(username);
//                   this.checkInputs();
//                 });
//               }}
//             />
//             {this.state.usernameErrors !== '' && (
//               <Fragment>
//                 <br />
//                 <span className="hint-error">{this.state.usernameErrors}</span>
//               </Fragment>
//             )}
//             <br />
//             <span className="hint">a-z, A-Z, 0-9, 4-20 characters</span>
//           </p>
//           <p>
//             <input
//               type="password"
//               value={this.state.password}
//               placeholder="Password"
//               onChange={(event) => {
//                 this.setState({ password: event.target.value }, () => {
//                   this.checkInputs();
//                 });
//               }}
//             />
//             {this.state.passwordErrors !== '' && (
//               <Fragment>
//                 <br />
//                 <span className="hint-error">{this.state.passwordErrors}</span>
//               </Fragment>
//             )}
//             <br />
//             <span className="hint">at least 8 characters</span>
//           </p>
//           <p>
//             <input
//               type="password"
//               value={this.state.passwordAgain}
//               placeholder="Password again"
//               onChange={(event) => {
//                 this.setState({ passwordAgain: event.target.value }, () => {
//                   this.checkInputs();
//                 });
//               }}
//             />
//             {this.state.passwordAgainErrors !== '' && (
//               <Fragment>
//                 <br />
//                 <span className="hint-error">
//                   {this.state.passwordAgainErrors}
//                 </span>
//               </Fragment>
//             )}
//             <br />
//             <span className="hint">same password</span>
//           </p>
//           <HCaptcha
//             sitekey="10000000-ffff-ffff-ffff-000000000001"
//             // sitekey="36cde9f3-38a3-4fd7-9314-bac28f55545b"
//             onVerify={this.onVerifyCaptcha}
//             onExpire={this.onExpireCaptcha}
//             onError={this.onErrorCaptcha}
//           ></HCaptcha>
//           <p>
//             <input
//               type="submit"
//               value="Register"
//               disabled={!this.state.allowSubmit}
//             />
//           </p>
//         </form>
//       </Fragment>
//     );
//   }

// checkInputs = () => {
//   let allowSubmit = true;

//   // Username
//   let usernameErrors: Array<string> = [];
//   if (this.state.username.length > 0) {
//     if (this.state.username.length < 4) {
//       usernameErrors.push('not long enough');
//       allowSubmit = false;
//     } else if (this.state.username.length > 20) {
//       usernameErrors.push('too long');
//       allowSubmit = false;
//     }
//     if (this.state.username.match(/[^a-zA-Z0-9]+/)) {
//       usernameErrors.push('invalid characters');
//       allowSubmit = false;
//     }
//     if (usernameErrors.length === 0) {
//       if (this.state.knownExistingUsernames.includes(this.state.username)) {
//         usernameErrors.push('username already taken');
//         allowSubmit = false;
//       } else if (
//         !this.state.knownAvailableUsernames.includes(this.state.username)
//       ) {
//         usernameErrors.push('checking username...');
//         allowSubmit = false;
//       }
//     }
//   }

//   // Password
//   let passwordErrors: Array<string> = [];
//   if (this.state.password.length > 0) {
//     if (this.state.password.length < 8) {
//       passwordErrors.push('not long enough');
//       allowSubmit = false;
//     } else if (this.state.password.length > 200) {
//       passwordErrors.push('too long');
//       allowSubmit = false;
//     }
//   }

//   // Password (again)
//   let passwordAgainErrors: Array<string> = [];
//   if (this.state.passwordAgain.length > 0) {
//     if (this.state.password !== this.state.passwordAgain) {
//       passwordAgainErrors.push('not the same');
//       allowSubmit = false;
//     }
//   }

//   if (this.state.captcha === '') {
//     allowSubmit = false;
//   }
//   if (!this.state.termsAccepted) {
//     allowSubmit = false;
//   }

//   this.setState({
//     usernameErrors: usernameErrors.join(', '),
//     passwordErrors: passwordErrors.join(', '),
//     passwordAgainErrors: passwordAgainErrors.join(', '),
//     allowSubmit,
//   });
// };

// checkUsernameAvailability = debounce((username: string) => {
//  const = [] useQuery(
//     gql`
//       query checkUsernameAvailability($username: String!) {
//         checkUsernameAvailability(username: $username)
//       }
//     `,
//   );
// client
//   .query({
//     query: gql`
//       query checkUsernameAvailability($username: String!) {
//         checkUsernameAvailability(username: $username)
//       }
//     `,
//     variables: {
//       username: username,
//     },
//   })
//   .then((result) => {
//     let available = result.data.checkUsernameAvailability;
//     let knownAvailableUsernames = this.state.knownAvailableUsernames;
//     let knownExistingUsernames = this.state.knownExistingUsernames;
//     if (available) {
//       knownAvailableUsernames.push(username);
//     } else {
//       knownExistingUsernames.push(username);
//     }
//     this.setState(
//       () => {
//         return {
//           knownAvailableUsernames,
//           knownExistingUsernames,
//         };
//       },
//       () => {
//         this.checkInputs();
//       },
//     );
//   })
//   .catch((err) => {
//     console.log('username check error', err);
//   });
// }, 400);

// onVerifyCaptcha = (captcha: string) => {
//   this.setState({ captcha });
//   this.checkInputs();
// };

// onExpireCaptcha = () => {};

// onErrorCaptcha = () => {};

// submit = (event: React.FormEvent) => {
//   event.preventDefault();

// client
//   .mutate({
//     mutation: gql`
//       mutation registration(
//         $username: String!
//         $password: String!
//         $captcha: String!
//       ) {
//         register(
//           username: $username
//           password: $password
//           captcha: $captcha
//         ) {
//           __typename
//           ... on User {
//             id
//             username
//           }
//           ... on UsernameAlreadyTaken {
//             username
//           }
//         }
//       }
//     `,
//     variables: {
//       username: this.state.username,
//       password: this.state.password,
//       captcha: this.state.captcha,
//     },
//     errorPolicy: 'none',
//   })
//   .then((result) => {
//     console.log('mutation register call succeeded:', result);
//     console.log('new id', result.data.register.id);
//   })
//   .catch((err) => {
//     console.log('mutation register call failed:', err);
//     console.log('GraphQL Errors:', err.graphQLErrors);
//     let gqlErrors = err.graphQLErrors;
//     for (const i in gqlErrors) {
//       if (gqlErrors.hasOwnProperty(i)) {
//         const gqlError = gqlErrors[i];
//         console.log('GraphQL Error:', gqlError);
//         console.log('GraphQL Error extensions:', gqlError.extensions);
//         if (gqlError.extensions) {
//         }
//       }
//     }
//   });
// };

// client!: React.ContextType<typeof ApolloContext>;
// }

// type props = {};

// type state = {
//   username: string;
//   password: string;
//   passwordAgain: string;
//   knownAvailableUsernames: Array<string>;
//   knownExistingUsernames: Array<string>;
//   usernameErrors: string;
//   passwordErrors: string;
//   passwordAgainErrors: string;
//   captcha: string;
//   termsAccepted: boolean;
//   allowSubmit: boolean;
// };

export default Registration;
