import React, { FunctionComponent, useState } from 'react';
import { useCookies } from 'react-cookie';

import { gql, useApolloClient, ApolloClient } from '@apollo/client';

class Session {
  loggedIn = false;
  id = '';
  username = '';
  logIn = (_: string) => {};
  logOut = () => {};
}

const SessionContext = React.createContext(new Session());

const SessionProvider: FunctionComponent = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');

  const [cookies, setCookie, removeCookie] = useCookies(['session']);

  const client = useApolloClient();

  let session = new Session();

  if (cookies.session && cookies.session.length > 0) {
    let data = JSON.parse(atob(cookies.session.split('.')[1]));

    session.loggedIn = true;
    session.id = data.id;
    session.username = data.username;

    getPersonalProfile(client, session.id, (result: any): void => {
      if (result) {
        if (result.data.me.__typename === 'User') {
          setLoggedIn(true);
          setId(result.data.me.id);
          setUsername(result.data.me.username);
        }
      }
    });
  }

  return (
    <SessionContext.Provider
      value={{
        loggedIn,
        id,
        username,

        logIn: (token: string) => {
          if (!token || token === '') {
            return;
          }

          setLoggedIn(false);
          setId('');
          setUsername('');
          removeCookie('session', {
            domain: '.arkipel.io',
          });

          setCookie('session', token, {
            domain: '.arkipel.io',
            maxAge: 60 * 60, // 1 hour
            // httpOnly: true,
            // sameSite: 'strict',
          });
        },

        logOut: () => {
          setLoggedIn(false);
          setId('');
          setUsername('');
          removeCookie('session', {
            domain: '.arkipel.io',
          });
        },
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

const getPersonalProfile = (
  client: ApolloClient<object>,
  userID: String,
  cb: (result: any) => void,
) => {
  client
    .query({
      query: gql`
        query me($userID: String!) {
          me(userID: $userID) {
            __typename
            ... on User {
              username
              groups {
                id
              }
            }
          }
        }
      `,
      variables: { userID },
    })
    .then(cb);
};

export { SessionContext, SessionProvider, Session };
