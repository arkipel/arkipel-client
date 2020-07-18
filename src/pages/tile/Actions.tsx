import React, {
  Fragment,
  FunctionComponent,
  useState,
  useContext,
} from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { gql, useQuery, useMutation } from '@apollo/client';
import {
  GetTileOwner,
  GetTileOwnerVariables,
} from '../../generated/GetTileOwner';

import { SessionContext } from '../../libs/session/session';

import { Info, Success, Error } from '../../ui/dialog/Msg';

import styles from './Actions.scss';

const TileActions: FunctionComponent<props> = ({ islandID, position }) => {
  // const [captcha, setCaptcha] = useState('');

  console.log('props:', islandID, position);

  const session = useContext(SessionContext);

  // Get tile owner
  let { data, loading, error } = useQuery<GetTileOwner, GetTileOwnerVariables>(
    gql`
      query GetTileOwner($islandID: String!, $position: Int!) {
        tile(islandID: $islandID, position: $position) {
          __typename
          ... on Tile {
            owner {
              id
            }
          }
        }
      }
    `,
    { variables: { islandID, position } },
  );

  // // Claim tile
  // let [submit, { loading, data }] = useMutation(
  //   gql`
  //     mutation getTileOwner($islandID: String!, $position: String!) {
  //       getTile(islandID: $islandID, position: $position) {
  //         __typename
  //         ... on Tile {
  //           owner {
  //             id
  //           }
  //         }
  //       }
  //     }
  //   `,
  // );

  let isOwner = false;
  let isOwned = false;

  if (data && !loading && !error) {
    if (data.tile.__typename === 'Tile') {
      if (data.tile.owner !== null) {
        isOwned = true;
        if (data.tile.owner.id === session.id) {
          isOwner = true;
        }
      }
    }
  }

  let canBeClaimed = !isOwned;
  let canBeAbandoned = isOwner;

  isOwned = true;

  return (
    <Fragment>
      <h3>Actions</h3>
      {error && (
        <Error>
          An error occured. The following actions might not be accurate.
        </Error>
      )}
      <div className={styles.action}>
        <p>Claim this tile</p>
        {!isOwned && <p className="hint-success">It is available.</p>}
        {isOwned && isOwner && (
          <p className="hint-error">You already own it.</p>
        )}
        {isOwned && !isOwner && (
          <p className="hint-error">It is already owned.</p>
        )}
        <p>
          <button disabled={!canBeClaimed}>Claim</button>
        </p>
      </div>

      <div>
        {canBeAbandoned && <p>You may abandon this tile.</p>}
        {!canBeAbandoned && <p>You not abandon this tile.</p>}
        <p>
          <button disabled={!canBeAbandoned}>Abandon</button>
        </p>
      </div>
    </Fragment>
  );
};

class props {
  islandID: string = '';
  position: number = 0;
}

export default TileActions;
