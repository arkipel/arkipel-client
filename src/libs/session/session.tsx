import React, { FunctionComponent, useState } from 'react';
import { useCookies } from 'react-cookie';

import { useApolloClient, gql } from '@apollo/client';

// Config
import Config from 'Config';

const SessionProvider: FunctionComponent = ({ children }) => {
  const [session, setSession] = useState(new Session(''));

  const [cookies, setCookie, removeCookie] = useCookies(['session']);

  if (!session.loggedIn && cookies.session && cookies.session.length > 0) {
    setSession(new Session(cookies.session));
  }

  const client = useApolloClient();

  return (
    <SessionContext.Provider
      value={{
        ...session,

        logIn: async (username: string, password: string): Promise<boolean> => {
          return client
            .query({
              query: gql`
                query login($username: String!, $password: String!) {
                  sessionToken(username: $username, password: $password)
                }
              `,
              fetchPolicy: 'network-only',
              variables: { username, password },
            })
            .then((response) => {
              const token = response.data.sessionToken;

              if (token.length > 0) {
                removeCookie('session', {
                  domain: '.' + Config.domain,
                  path: '/',
                });

                setCookie('session', token, {
                  domain: '.' + Config.domain,
                  path: '/',
                  maxAge: 60 * 60, // 1 hour
                  // httpOnly: true,
                  // sameSite: 'strict',
                });

                setSession(new Session(token));

                return true;
              }

              return false;
            })
            .catch((err) => {
              throw err;
            });
        },

        logOut: () => {
          removeCookie('session', {
            domain: '.' + Config.domain,
            path: '/',
          });

          setSession(new Session(''));
        },

        update: (newValues: Partial<Session>): void => {
          let newSession = { ...session, ...newValues };
          setSession(newSession);

          client
            .query({
              query: gql`
                query refreshToken($username: String!, $password: String!) {
                  newSessionToken(old: $token)
                }
              `,
              fetchPolicy: 'network-only',
              variables: { old: session.token },
            })
            .then((response) => {
              const token = response.data.newSessionToken;

              if (token.length > 0) {
                removeCookie('session', {
                  domain: '.' + Config.domain,
                  path: '/',
                });

                setCookie('session', token, {
                  domain: '.' + Config.domain,
                  path: '/',
                  maxAge: 60 * 60, // 1 hour
                  // httpOnly: true,
                  // sameSite: 'strict',
                });

                setSession(new Session(token));

                return true;
              }

              return false;
            })
            .catch((err) => {
              throw err;
            });
        },
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

class Session {
  constructor(token: string) {
    this.token = token;

    if (token.length > 0) {
      let data = JSON.parse(atob(token.split('.')[1]));

      this.loggedIn = true;
      this.id = data.id;
      this.username = data.username;
    }
  }

  token = '';
  loggedIn = false;
  id = '';
  username = '';
}

const SessionContext = React.createContext<
  Session & {
    logIn: (username: string, password: string) => Promise<boolean>;
    logOut: () => void;
    update: (options: Partial<Session>) => void;
  }
>({
  ...new Session(''),
  logIn: (_username: string, _password: string) => {
    return Promise.resolve(true);
  },
  logOut: () => {},
  update: () => {},
});

export { SessionContext, SessionProvider, Session };
