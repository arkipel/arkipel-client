import React, { FunctionComponent, useState } from 'react';
import { useCookies } from 'react-cookie';

// Config
import Config from 'Config';

const SessionProvider: FunctionComponent = ({ children }) => {
  const [session, setSession] = useState(new Session(''));

  const [cookies, setCookie, removeCookie] = useCookies(['session']);

  if (!session.loggedIn && cookies.session && cookies.session.length > 0) {
    setSession(new Session(cookies.session));
  }

  return (
    <SessionContext.Provider
      value={{
        ...session,

        logIn: (token: string) => {
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
      let data = JSON.parse(atob(token.split('.')[1]));

      this.loggedIn = true;
      this.id = data.id;
      this.username = data.username;
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
