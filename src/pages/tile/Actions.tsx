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
import { ClaimTile, ClaimTileVariables } from 'generated/ClaimTile';
import { AbandonTile, AbandonTileVariables } from 'generated/AbandonTile';

const TileActions: FunctionComponent<props> = ({ islandID, position }) => {
  const [getTileError, setGetTileError] = useState(false);
  const [claimError, setClaimError] = useState(false);
  const [abandonError, setAbandonError] = useState(false);

  const session = useContext(SessionContext);

  // Get tile owner
  let { data, loading } = useQuery<GetTileOwner, GetTileOwnerVariables>(
    gql`
      query GetTileOwner($islandID: String!, $position: Int!) {
        tile(islandID: $islandID, position: $position) {
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
      variables: { islandID, position },
      onError: () => {
        setGetTileError(true);
      },
    },
  );

  // Claim tile
  let [claimTile, { data: claimData, loading: claimLoading }] = useMutation<
    ClaimTile,
    ClaimTileVariables
  >(
    gql`
      mutation ClaimTile(
        $userID: String!
        $islandID: String!
        $position: Int!
      ) {
        claimTile(userID: $userID, islandID: $islandID, position: $position) {
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
      variables: { userID: session.id, islandID, position },
      onError: () => {
        setClaimError(true);
      },
    },
  );

  // Abandon tile
  let [
    abandonTile,
    { data: abandonData, loading: abandonLoading },
  ] = useMutation<AbandonTile, AbandonTileVariables>(
    gql`
      mutation AbandonTile(
        $userID: String!
        $islandID: String!
        $position: Int!
      ) {
        abandonTile(userID: $userID, islandID: $islandID, position: $position) {
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
      variables: { userID: session.id, islandID, position },
      onError: () => {
        setAbandonError(true);
      },
    },
  );

  let isOwner = false;
  let isOwned = false;

  if (data && !loading && !getTileError) {
    if (data.tile.__typename === 'Tile') {
      if (data.tile.owner !== null) {
        isOwned = true;
        if (data.tile.owner.id === session.id) {
          isOwner = true;
        }
      }
    }
  }

  let canBeClaimed = session.loggedIn && !isOwned;
  let canBeAbandoned = session.loggedIn && isOwner;

  let claimFailed =
    claimData?.claimTile?.__typename === 'NotAuthorized' || claimError;
  let abandonFailed =
    abandonData?.abandonTile?.__typename === 'NotAuthorized' || abandonError;

  return (
    <Fragment>
      <h3>Actions</h3>
      <Error visible={getTileError}>
        An error occured. The following actions might not be accurate.
      </Error>
      <div className={styles.actions}>
        <div className={styles.action}>
          <h4>Claim tile</h4>
          {!isOwned && <span className="hint-success">It is available.</span>}
          {!isOwner && (
            <span className="hint-success">
              You are eligible to claim a tile.
            </span>
          )}
          {!session.loggedIn && (
            <span className="hint-error">You are not logged in.</span>
          )}
          {isOwned && isOwner && (
            <>
              <span className="hint-error">You already own it.</span>
              <br />
              <span className="hint-error">You already own it.</span>
              <br />
              <span className="hint-error">You already own it.</span>
            </>
          )}
          {isOwned && !isOwner && (
            <span className="hint-error">It is already owned.</span>
          )}
          <Error visible={claimFailed} onConfirmation={() => {}}>
            Claiming failed, please try again later.
          </Error>
        </div>
        <div className={styles.button}>
          <button
            disabled={!canBeClaimed || loading || claimLoading}
            onClick={() => {
              claimTile();
            }}
          >
            Claim
          </button>
        </div>
        <div className={styles.action}>
          <h4>Abandon tile</h4>
          {!session.loggedIn && (
            <span className="hint-error">You are not logged in.</span>
          )}
          <Error visible={abandonFailed} onConfirmation={() => {}}>
            Abandoning failed, please try again later.
          </Error>
        </div>
        <div className={styles.button}>
          <button
            disabled={!canBeAbandoned || loading || abandonLoading}
            onClick={() => {
              abandonTile();
            }}
          >
            Abandon
          </button>
        </div>
      </div>
    </Fragment>
  );
};

class props {
  islandID: string = '';
  position: number = 0;
}

export default TileActions;
