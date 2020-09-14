import React, { FunctionComponent, useContext } from 'react';
import Media from 'react-media';

import { useQuery, gql, useApolloClient } from '@apollo/client';
import {
  GetAllConstructionSites,
  GetAllConstructionSitesVariables,
} from '../generated/GetAllConstructionSites';

import ConstructionSite from '../models/ConstructionSite';

import { SessionContext } from '../libs/session/session';

// Components
import Scrollable from '../ui/misc/Scrollable';
import TimeLeft from '../ui/time/TimeLeft';

// Assets
import styles from './NotificationPane.scss';

const NotificationPane: FunctionComponent<props> = ({
  visible,
  onCloseClick,
}) => {
  const session = useContext(SessionContext);

  const client = useApolloClient();

  let notificationPaneClassName = visible ? styles.visible + ' ' : '';
  notificationPaneClassName += styles.notificationPane;

  let islandId = session.id;
  const loggedIn = session.id !== '';

  const { data, error } = useQuery<
    GetAllConstructionSites,
    GetAllConstructionSitesVariables
  >(
    gql`
      query GetAllConstructionSites($islandId: String!) {
        island(islandId: $islandId) {
          ... on Island {
            id
            constructionSites {
              id
              infrastructure
              workloadLeft
              finishedAt
              tile {
                position
              }
            }
          }
        }
      }
    `,
    { variables: { islandId } },
  );

  let sites = new Array<ConstructionSite>();
  if (data?.island.__typename === 'Island') {
    data.island.constructionSites.map((cs) => {
      sites.push(new ConstructionSite(cs));
    });

    sites.sort((s1, s2) => {
      return s1.finishedAt.toMillis() - s2.finishedAt.toMillis();
    });
  }
  const hasSites = sites.length > 0;

  return (
    <div className={notificationPaneClassName}>
      <div className={styles.topBar}>
        <div>
          <Media
            query="(max-width: 999px)"
            render={() => (
              <div onClick={onCloseClick} className="button">
                <img
                  src="https://icons.arkipel.io/ui/arrow_left.svg"
                  alt="&#10092;"
                />
              </div>
            )}
          />
        </div>
      </div>
      <Scrollable>
        <div className={styles.content}>
          {!loggedIn && <p>You are not logged in.</p>}
          {error && <p>Construction sites could not be loaded.</p>}
          {loggedIn && !hasSites && <p>Nothing is currently being built.</p>}
          {loggedIn &&
            hasSites &&
            sites.map((site) => {
              return (
                <p key={Math.random()}>
                  A {site.infrastructure} is being built on tile{' '}
                  {site.tilePosition}. It will be done{' '}
                  <b>
                    <TimeLeft
                      target={site.finishedAt}
                      onReach={() => {
                        client.cache.evict({
                          id: 'ConstructionSite:' + site.id,
                        });
                      }}
                    />
                  </b>
                  .
                </p>
              );
            })}
        </div>
      </Scrollable>
    </div>
  );
};

type props = {
  visible: boolean;
  onCloseClick: () => void;
};

export default NotificationPane;
