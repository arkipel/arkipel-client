import React, {
  FunctionComponent,
  useState,
  useEffect,
  useContext,
} from 'react';

import { useApolloClient, useQuery, gql } from '@apollo/client';
import { Login, LoginVariables } from '../../generated/Login';
import {
  RefreshToken,
  RefreshTokenVariables,
} from '../../generated/RefreshToken';
import {
  GetCurrentInventory,
  GetCurrentInventoryVariables,
} from '../../generated/GetCurrentInventory';

import { SessionContext } from './session';

// Config
import { domain } from 'Config';

import Inventory from '../../models/Inventory';

const InventoryProvider: FunctionComponent = ({ children }) => {
  // const [updateNumber, forceUpdate] = useState(0);
  const [inventory, setInventory] = useState(new Inventory({}));

  const session = useContext(SessionContext);

  const client = useApolloClient();

  const { data } = useQuery<GetCurrentInventory, GetCurrentInventoryVariables>(
    gql`
      query GetCurrentInventory($islandId: String!, $userId: String!) {
        inventory(islandId: $islandId, userId: $userId) {
          ... on Inventory {
            id
            population
            workforce
            material
            materialProduction
            energyUsed
            energy
            bankLevels
            timestamp
          }
        }
      }
    `,
    { variables: { islandId: session.id, userId: session.id } },
  );

  // if (updateNumber === 0) {
  //   forceUpdate(Math.random());
  // }

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('setInterval');
      // forceUpdate(Math.random());

      if (data?.inventory?.__typename === 'Inventory') {
        let inv = new Inventory(data.inventory);
        console.log('We have an inventory', inv);

        if (inv.materialProduction > 0) {
          console.log('There is production', inv);
          let secs = inv.sinceLastUpdate().seconds;
          inv.material += secs * inv.materialProduction;

          setInventory(inv);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [data]);

  return (
    <InventoryContext.Provider
      value={{
        ...inventory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

// class Session {
//   constructor(token: string) {
//     this.token = token;

//     if (token.length > 0) {
//       let data = JSON.parse(atob(token.split('.')[1]));

//       this.loggedIn = true;
//       this.id = data.id;
//       this.username = data.username;
//     }
//   }

//   token = '';
//   loggedIn = false;
//   id = '';
//   username = '';
//   inventory = new Inventory({});
// }

const InventoryContext = React.createContext<Inventory>({
  ...new Inventory(''),
});

export { InventoryContext, InventoryProvider };
