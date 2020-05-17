import React, { FunctionComponent, useState } from 'react';
import { useCookies } from 'react-cookie';

const SessionProvider: FunctionComponent = ({ children }) => {
  const [session, setSession] = useState(new Session(''));

  const [cookies, setCookie, removeCookie] = useCookies(['session']);

  if (cookies.session && cookies.session.length > 0) {
    let data = JSON.parse(atob(cookies.session.split('.')[1]));

    session.loggedIn = true;
    session.id = data.id;
    session.username = data.username;
  }

  return (
    <SessionContext.Provider
      value={{
        ...session,

        logIn: (token: string) => {
          removeCookie('session', {
            domain: '.arkipel.io',
            path: '/',
          });

          setCookie('session', token, {
            domain: '.arkipel.io',
            path: '/',
            maxAge: 60 * 60, // 1 hour
            // httpOnly: true,
            // sameSite: 'strict',
          });

          setSession(new Session(token));
        },

        logOut: () => {
          removeCookie('session', {
            domain: '.arkipel.io',
            path: '/',
          });

          setSession(new Session(''));
        },
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

class Session {
  constructor(token: string) {
    if (token.length > 0) {
      this.loggedIn = true;
    }
  }

  loggedIn = false;
  id = '';
  username = '';
}

const SessionContext = React.createContext<
  Session & { logIn: (_: string) => void; logOut: () => void }
>({ ...new Session(''), logIn: (_: string) => {}, logOut: () => {} });

export { SessionContext, SessionProvider, Session };
