import React, {
  FunctionComponent,
  useState,
  useEffect,
  useContext,
} from 'react';

import { useQuery, gql } from '@apollo/client';
import {
  GetCurrentInventory,
  GetCurrentInventoryVariables,
} from '../../generated/GetCurrentInventory';

import { SessionContext } from './session';

import Inventory from '../../models/Inventory';
import { FormatQuantity } from '../../ui/text/format';

const InventoryProvider: FunctionComponent = ({ children }) => {
  const [inventory, setInventory] = useState(new Inventory({}));
  const [materialFormatted, setMaterialFormatted] = useState('0');

  const session = useContext(SessionContext);

  const { data } = useQuery<GetCurrentInventory, GetCurrentInventoryVariables>(
    gql`
      query GetCurrentInventory($islandId: String!, $userId: String!) {
        inventory(islandId: $islandId, userId: $userId) {
          ... on Inventory {
            id
            population
            energy
            materialProduction
            material
            bankLevels
            timestamp
            island {
              lastUpdateAt
            }
          }
        }
      }
    `,
    { variables: { islandId: session.id, userId: session.id } },
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (data?.inventory?.__typename === 'Inventory') {
        let inv = new Inventory(data.inventory);

        if (inv.materialProduction > 0 && inv.lastUpdate) {
          let secs = Math.floor(inv.sinceLastUpdate().milliseconds / 1000);
          inv.material += secs * inv.materialProduction;

          setInventory(inv);
        }

        let matFormatted = FormatQuantity(inv.material);
        if (matFormatted !== materialFormatted) {
          setMaterialFormatted(matFormatted);
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
        materialFormatted,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

const InventoryContext = React.createContext<
  Inventory & { materialFormatted: string }
>({
  ...new Inventory(''),
  materialFormatted: '0',
});

export { InventoryContext, InventoryProvider };
