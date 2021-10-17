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
  const [foodFormatted, setFoodFormatted] = useState('0');
  const [frozenFoodFormatted, setFrozenFoodFormatted] = useState('0');

  const session = useContext(SessionContext);

  const { data } = useQuery<GetCurrentInventory, GetCurrentInventoryVariables>(
    gql`
      query GetCurrentInventory($islandId: String!, $userId: String!) {
        inventory(islandId: $islandId, userId: $userId) {
          ... on Inventory {
            id
            populationUsed
            populationFree
            populationTotal
            energyUsed
            energyFree
            energyTotal
            materialProduction
            material
            foodProduction
            food
            frozenFoodProduction
            frozenFood
            frozenFoodStorage
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
        }

        if (inv.foodProduction > 0 && inv.lastUpdate) {
          let secs = Math.floor(inv.sinceLastUpdate().milliseconds / 1000);
          inv.food += secs * inv.foodProduction;
        }

        if (inv.frozenFoodProduction > 0 && inv.lastUpdate) {
          let secs = Math.floor(inv.sinceLastUpdate().milliseconds / 1000);
          let newFrozen = secs * inv.frozenFoodProduction;

          if (inv.frozenFood + newFrozen > inv.frozenFoodStorage) {
            newFrozen = 0;
          }

          if (newFrozen > inv.food) {
            newFrozen = inv.food;
          }

          inv.frozenFood += newFrozen;
          inv.food -= newFrozen;
        }

        if (inv.food < 0) {
          inv.food = 0;
        }

        if (inv.frozenFood > inv.frozenFoodStorage) {
          inv.frozenFood = inv.frozenFoodStorage;
        }

        if (inv.frozenFood < 0) {
          inv.frozenFood = 0;
        }

        setInventory(inv);

        let matFormatted = FormatQuantity(inv.material);
        if (matFormatted !== materialFormatted) {
          setMaterialFormatted(matFormatted);
        }

        let foodFormatted = FormatQuantity(inv.food);
        if (foodFormatted !== foodFormatted) {
          setFoodFormatted(foodFormatted);
        }

        let frozenFoodFormatted = FormatQuantity(inv.frozenFood);
        if (frozenFoodFormatted !== frozenFoodFormatted) {
          setFrozenFoodFormatted(frozenFoodFormatted);
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
        foodFormatted,
        frozenFoodFormatted,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

const InventoryContext = React.createContext<
  Inventory & {
    materialFormatted: string;
    foodFormatted: string;
    frozenFoodFormatted: string;
  }
>({
  ...new Inventory(''),
  materialFormatted: '0',
  foodFormatted: '0',
  frozenFoodFormatted: '0',
});

export { InventoryContext, InventoryProvider };
