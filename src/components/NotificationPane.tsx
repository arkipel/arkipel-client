import React, { FunctionComponent, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { useQuery, gql, useApolloClient } from '@apollo/client';
import {
  GetAllConstructionSitesQuery,
  GetAllConstructionSitesQueryVariables,
} from '../generated/graphql';

import ConstructionSite from '../models/ConstructionSite';

import { SessionContext } from '../libs/session/session';

// Components
import ResourcesPane from '../components/ResourcesPane';
import MoneyPane from '../components/MoneyPane';
import Scrollable from '../ui/layout/Scrollable';
import TimeLeft from '../ui/text/TimeLeft';
import Tile from '../models/Tile';
import MapTile from '../components/MapTile';

const NotificationPane: FunctionComponent<props> = ({
  visible,
  onCloseClick,
}) => {
  const session = useContext(SessionContext);

  const client = useApolloClient();

  // To hide the pane, move
  // it to the right.
  let display = 'grid';
  if (!visible) {
    display = 'none';
  }

  let styleVars = {
    '--display': display,
  } as React.CSSProperties;

  let islandId = session.id;
  const loggedIn = session.id !== '';

  const { data, error } = useQuery<
    GetAllConstructionSitesQuery,
    GetAllConstructionSitesQueryVariables
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
                level
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
    <StyledNotificationPane style={styleVars}>
      <StyledContent>
        <ResourcesPane />
      </StyledContent>
      <StyledContent>
        <MoneyPane />
      </StyledContent>
      <Scrollable style={{ borderRadius: '4px' }}>
        <StyledContent>
          {!loggedIn && <p>You are not logged in.</p>}
          {loggedIn && error && <p>Construction sites could not be loaded.</p>}
          {loggedIn && !hasSites && <p>Nothing is currently being built.</p>}
          {loggedIn &&
            hasSites &&
            sites.map((site) => {
              return (
                <StyledNotification key={site.id}>
                  <div>
                    <MapTile
                      tile={
                        new Tile({
                          position: site.tilePosition,
                          infrastructure: site.infrastructure,
                        })
                      }
                      size={50}
                    />
                  </div>
                  <div>
                    <p>
                      <b>
                        Construction on{' '}
                        <NavLink
                          exact
                          to={'/island/tiles/' + site.tilePosition}
                          onClick={onCloseClick}
                        >
                          {site.infrastructure.toLocaleLowerCase()} (
                          {site.tilePosition})
                        </NavLink>{' '}
                      </b>
                    </p>
                    <p>
                      Level {site.tile.level} → {site.tile.level + 1}
                    </p>
                  </div>
                  <div>
                    <p>
                      Done{' '}
                      <TimeLeft
                        target={site.finishedAt}
                        onReach={() => {
                          client.cache.evict({
                            id: 'ConstructionSite:' + site.id,
                          });
                        }}
                      />
                    </p>
                  </div>
                </StyledNotification>
              );
            })}
        </StyledContent>
      </Scrollable>
    </StyledNotificationPane>
  );
};

type props = {
  visible: boolean;
  onCloseClick: () => void;
};

const StyledNotificationPane = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 10px;
  grid-row: 1;
  grid-column: 2;
  justify-self: flex-end;
  min-height: 0;
  height: 100%;
  width: 300px;
  z-index: 110;

  @media all and (max-width: 699px) {
    display: var(--display);
    grid-column: 1;
    background: #fff;
  }

  @media all and (min-width: 700px) and (max-width: 999px) {
    display: var(--display);
    margin-top: -10px;
    margin-right: -10px;
    height: calc(100% + 20px);
    grid-column: 2;
    background: #fff;
  }

  @media all and (min-width: 1000px) {
    grid-column: 3;
    transition: none;
  }
`;

const StyledNotification = styled.div`
  display: grid;
  font-size: 14px;
  min-height: 50px;
  grid-template-columns: 50px 1fr;

  a {
    color: #666;
  }

  div:nth-child(1) {
    grid-row: 1;
    grid-column: 1;
  }

  div:nth-child(2) {
    grid-row: 1;
    grid-column: 2;
    padding: 4px;
  }

  div:nth-child(3) {
    grid-row: 1;
    grid-column: 1 / 3;
    place-self: end end;
    padding: 2px 4px;
    background: rgba(0, 0, 0, 0.2);
    color: #eee;
    font-size: 12px;
  }
`;

const StyledContent = styled.div`
  display: grid;
  grid-gap: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 4px;
`;

export default NotificationPane;
