import React, {
  Fragment,
  FunctionComponent,
  useState,
  useContext,
  useEffect,
} from 'react';

import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';
import {
  GetTileOwner,
  GetTileOwnerVariables,
} from '../../generated/GetTileOwner';

import { SessionContext } from '../../libs/session/session';

import { Error } from '../../ui/dialog/Msg';

import styles from './Actions.scss';
import { ClaimTile, ClaimTileVariables } from 'generated/ClaimTile';
import { AbandonTile, AbandonTileVariables } from 'generated/AbandonTile';
import {
  GetNumberTiles,
  GetNumberTilesVariables,
} from 'generated/GetNumberTiles';
import { NumberTiles } from 'generated/NumberTiles';

const TileActions: FunctionComponent<props> = ({ islandId, position }) => {
  const [getTileError, setGetTileError] = useState(false);
  const [claimError, setClaimError] = useState(false);
  const [abandonError, setAbandonError] = useState(false);
  const [numberTiles, setNumberTiles] = useState(-1);
  const [isOwned, setIsOwned] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const session = useContext(SessionContext);

  // Get number of tiles
  let [getNumberTiles, { data: getNumberTilesData }] = useLazyQuery<
    GetNumberTiles,
    GetNumberTilesVariables
  >(
    gql`
      query GetNumberTiles($userId: String!) {
        me(userId: $userId) {
          ... on User {
            id
            numberTiles
          }
        }
      }
    `,
    {
      variables: { userId: session.id },
      onError: () => {
        setNumberTiles(-1);
      },
      onCompleted: (data) => {
        if (data.me.__typename === 'User') {
          setNumberTiles(data.me.numberTiles);
        }
      },
    },
  );

  useEffect(() => {
    if (session.loggedIn) {
      getNumberTiles();
    }

    if (getNumberTilesData?.me.__typename === 'User') {
      if (getNumberTilesData.me) {
        setNumberTiles(getNumberTilesData.me.numberTiles);
      } else {
        setNumberTiles(-1);
      }
    }
  }, [session.loggedIn, getNumberTilesData]);

  // Get tile owner
  useQuery<GetTileOwner, GetTileOwnerVariables>(
    gql`
      query GetTileOwner($islandId: String!, $position: Int!) {
        tile(islandId: $islandId, position: $position) {
          __typename
          ... on Tile {
            id
            owner {
              id
            }
          }
        }
      }
    `,
    {
      variables: { islandId, position },
      onError: () => {
        setGetTileError(true);
      },
      onCompleted: (data) => {
        if (data?.tile.__typename === 'Tile') {
          if (data.tile.owner) {
            setIsOwned(true);
            setIsOwner(data.tile.owner.id === session.id);
          } else {
            setIsOwned(false);
            setIsOwner(false);
          }
        }
      },
    },
  );

  // Claim tile
  let [claimTile, { loading: claimLoading }] = useMutation<
    ClaimTile,
    ClaimTileVariables
  >(
    gql`
      mutation ClaimTile(
        $userId: String!
        $islandId: String!
        $position: Int!
      ) {
        claimTile(userId: $userId, islandId: $islandId, position: $position) {
          ... on Tile {
            id
            owner {
              id
              numberTiles
            }
          }
        }
      }
    `,
    {
      variables: { userId: session.id, islandId, position },
      onError: () => {
        setClaimError(true);
      },
      onCompleted: (data) => {
        setClaimError(false);

        if (data.claimTile?.__typename === 'Tile') {
          if (data.claimTile.owner) {
            setNumberTiles(data.claimTile.owner.numberTiles);
            setIsOwned(true);
            setIsOwner(true);
          }
        } else if (data.claimTile?.__typename === 'NotAuthorized') {
          setClaimError(true);
        }
      },
    },
  );

  // Abandon tile
  let [abandonTile, { loading: abandonLoading }] = useMutation<
    AbandonTile,
    AbandonTileVariables
  >(
    gql`
      mutation AbandonTile(
        $userId: String!
        $islandId: String!
        $position: Int!
      ) {
        abandonTile(userId: $userId, islandId: $islandId, position: $position) {
          ... on Tile {
            id
            owner {
              id
              numberTiles
            }
          }
        }
      }
    `,
    {
      variables: { userId: session.id, islandId, position },
      update: (cache) => {
        cache.writeFragment<NumberTiles>({
          id: 'User:' + session.id,
          fragment: gql`
            fragment NumberTiles on User {
              numberTiles
            }
          `,
          data: { __typename: 'User', numberTiles: numberTiles - 1 },
        });
      },
      onError: () => {
        setAbandonError(true);
      },
      onCompleted: (data) => {
        setAbandonError(false);

        if (data.abandonTile?.__typename === 'Tile') {
          setIsOwned(false);
          setIsOwner(false);
        } else if (data.abandonTile?.__typename === 'NotAuthorized') {
          setAbandonError(true);
        }
      },
    },
  );

  // User
  let canClaim = numberTiles >= 0 && numberTiles <= 2;
  let canAbandon = numberTiles >= 1 && numberTiles <= 3;

  // Tile
  let canBeClaimed = session.loggedIn && !isOwned && canClaim;
  let canBeAbandoned = session.loggedIn && isOwner && canAbandon;

  return (
    <Fragment>
      <h3>Actions</h3>
      <Error visible={getTileError}>
        An error occured. The following actions might not be accurate.
      </Error>
      <div className={styles.actions}>
        <div className={styles.action}>
          <h4>Claim tile</h4>
          {!session.loggedIn && (
            <span className="hint-error">You are not logged in.</span>
          )}
          {canClaim && (
            <span className="hint-success">
              You are eligible to claim a tile ({3 - numberTiles} left).
            </span>
          )}
          {session.loggedIn && !canClaim && (
            <span className="hint-error">
              You own too many tiles to claim one.
            </span>
          )}
          {isOwner && <span className="hint-error">You already own it.</span>}
          {!isOwner && isOwned && (
            <span className="hint-error">It is already owned.</span>
          )}
          {!isOwned && <span className="hint-success">It is available.</span>}
          <Error
            visible={claimError}
            onConfirmation={() => {
              setClaimError(false);
            }}
          >
            Claiming failed, please try again later.
          </Error>
        </div>
        <div className={styles.button}>
          <button
            disabled={!canBeClaimed}
            onClick={() => {
              claimTile();
            }}
          >
            {claimLoading && 'Loading...'}
            {!claimLoading && 'Claim'}
          </button>
        </div>
        <div className={styles.action}>
          <h4>Abandon tile</h4>
          {!session.loggedIn && (
            <span className="hint-error">You are not logged in.</span>
          )}
          {canAbandon && (
            <span className="hint-success">
              You are eligible to abandon a tile.
            </span>
          )}
          {session.loggedIn && !canAbandon && (
            <span className="hint-error">
              You own too many tiles to abandon one.
            </span>
          )}
          {isOwner && <span className="hint-success">You own it.</span>}
          {!isOwner && <span className="hint-error">You do not own it.</span>}
          <Error
            visible={abandonError}
            onConfirmation={() => {
              setAbandonError(false);
            }}
          >
            Abandoning failed, please try again later.
          </Error>
        </div>
        <div className={styles.button}>
          <button
            disabled={!canBeAbandoned}
            onClick={() => {
              abandonTile();
            }}
          >
            {abandonLoading && 'Loading...'}
            {!abandonLoading && 'Abandon'}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

class props {
  islandId: string = '';
  position: number = 0;
}

export default TileActions;
