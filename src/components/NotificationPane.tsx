import React, { FunctionComponent, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Media from 'react-media';

import { useQuery, gql, useApolloClient } from '@apollo/client';
import {
  GetAllConstructionSites,
  GetAllConstructionSitesVariables,
} from '../generated/GetAllConstructionSites';

import ConstructionSite from '../models/ConstructionSite';

import { SessionContext } from '../libs/session/session';

// Components
import ResourcesPane from '../components/ResourcesPane';
import { TopBar, Box } from '../ui/layout/TopBar';
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
  let translateX = '0';
  let visibleBoxShadow = '0';
  if (!visible) {
    translateX = '300px';
  } else {
    visibleBoxShadow = '-1px 0 10px #111';
  }

  let styleVars = {
    '--translateX': translateX,
    '--visibleBoxShadow': visibleBoxShadow,
  } as React.CSSProperties;

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
    <Style style={styleVars}>
      <TopBar background="#ed947e">
        <div>
          {/* This empty div makes the other one
              the second div, which has its content
              displayed to the right. */}
        </div>
        <div>
          <Media
            query="(max-width: 999px)"
            render={() => (
              <Box onClick={onCloseClick}>
                <img
                  style={{
                    // transition: '0.2s linear',
                    rotate: '180deg',
                    opacity: '20%',
                  }}
                  src="https://icons.arkipel.io/ui/arrow_left.svg"
                  alt="&#10092;"
                />
              </Box>
            )}
          />
        </div>
      </TopBar>
      <ResourcesPane />
      <Scrollable>
        <StyleContent>
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
                          to="/island/treasury"
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
        </StyleContent>
      </Scrollable>
    </Style>
  );
};

type props = {
  visible: boolean;
  onCloseClick: () => void;
};

const Style = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-row: 1;
  justify-self: flex-end;
  min-height: 0;
  height: 100%;
  width: 300px;
  background: #ffffff;
  z-index: 120;
  transform: translateX(var(--translateX));
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  scrollbar-width: thin;
  scrollbar-color: #e76f51 white;

  @media all and (max-width: 699px) {
    grid-column: 1;
  }

  @media all and (min-width: 700px) and (max-width: 999px) {
    grid-column: 2;
  }

  @media all and (min-width: 1000px) {
    grid-column: 3;
    transform: translateX(calc(0 - var(--translateX)));
    transition: none;
  }

  @media all and (max-width: 999px) {
    box-shadow: var(--visibleBoxShadow);
  }
`;

const StyledNotification = styled.div`
  display: grid;
  font-size: 14px;
  height: 50px;
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

const StyleContent = styled.div`
  display: grid;
  grid-gap: 10px;
  padding: 10px;
`;

export default NotificationPane;
