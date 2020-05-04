import React, { FunctionComponent, useState } from 'react';
import { useCookies } from 'react-cookie';

import { gql, useApolloClient } from '@apollo/client';

const SessionContext = React.createContext({
  loggedIn: false,
  username: '',
  logIn: (_: string) => {},
  logOut: () => {},
});

const SessionProvider: FunctionComponent = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const [, setCookie] = useCookies(['session']);

  //   const [getInfo, { data, loading, error }] = useLazyQuery(
  //     gql`
  //       query me($userID: String!) {
  //         me(userID: $username) {
  //           __typename
  //           username
  //           ... on User {
  //             groups
  //           }
  //         }
  //       }
  //     `,
  //   );

  const client = useApolloClient();

  return (
    <SessionContext.Provider
      value={{
        loggedIn,
        username,

        logIn: (token: string) => {
          console.log('about to log in with', token);

          if (!token) {
            return;
          }

          setCookie('session', token, {
            maxAge: 60 * 60, // 1 hour
            // httpOnly: true,
            // sameSite: 'strict',
          });

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
            .then((result: any) => {
              console.log('me:', result);

              if (result) {
                if (result.data.me.__typename === 'User') {
                  setLoggedIn(true);
                  setUsername(result.data.me.username);
                }
              }
            })
            .catch((err) => {
              console.log('request failed:', err);
            });
        },

        logOut: () => {
          setLoggedIn(false);
          setUsername('');
          //   setCookie('session', '');
        },
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
