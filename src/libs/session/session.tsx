import React, { FunctionComponent, useState } from 'react';
import { useCookies } from 'react-cookie';

import { gql, useApolloClient, ApolloClient } from '@apollo/client';

const SessionContext = React.createContext({
  loggedIn: false,
  username: '',
  logIn: (_: string) => {},
  logOut: () => {},
});

const SessionProvider: FunctionComponent = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const [cookies, setCookie] = useCookies(['session']);

  const client = useApolloClient();

  if (!loggedIn && cookies.session !== '') {
    getPersonalProfile(client, cookies.session, (result: any): void => {
      if (result) {
        if (result.data.me.__typename === 'User') {
          setLoggedIn(true);
          setUsername(result.data.me.username);
        }
      }
    });
  }

  return (
    <SessionContext.Provider
      value={{
        loggedIn,
        username,

        logIn: (token: string) => {
          if (!token || token === '') {
            return;
          }

          setCookie('session', token, {
            maxAge: 60 * 60, // 1 hour
            // httpOnly: true,
            // sameSite: 'strict',
          });
        },

        logOut: () => {
          setLoggedIn(false);
          setUsername('');
          setCookie('session', '');
        },
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

const getPersonalProfile = (
  client: ApolloClient<object>,
  token: string,
  cb: (result: any) => void,
) => {
  if (!token || token === '') {
    return;
  }

  let data = JSON.parse(atob(token.split('.')[1]));

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
      variables: { userID: data.ID },
    })
    .then(cb);
};

export { SessionContext, SessionProvider };
