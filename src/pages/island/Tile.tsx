import React, {
  Fragment,
  FunctionComponent,
  useContext,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useQuery, gql, useMutation, useApolloClient } from '@apollo/client';
import {
  BuildInfrastructureMutation,
  BuildInfrastructureMutationVariables,
  NewConstructionSiteFragment,
  GetTileQuery,
  GetTileQueryVariables,
} from '../../generated/graphql';

import { SessionContext } from '../../libs/session/session';
import { InventoryContext } from '../../libs/session/inventory';

import Tile from '../../models/Tile';
import ConstructionSite from '../../models/ConstructionSite';
import Blueprint from '../../models/Blueprint';

import TileStatusToggle from '../../components/TileStatusToggle';

import { ShortenNumber } from '../../ui/text/format';
import TimeLeft from '../../ui/text/TimeLeft';
import { Button } from '../../ui/form/Button';
import { Error } from '../../ui/dialog/Msg';

import { DateTime } from 'luxon';

const TilePage: FunctionComponent = () => {
  const session = useContext(SessionContext);
  const inventory = useContext(InventoryContext);

  const { position: positionParam } = useParams<{ position: string }>();

  // Position as number
  const position = parseInt(positionParam || '0');
  if (position < 0 || position > 99) {
    return <Error>Invalid tile number.</Error>;
  }

  let islandId = session.id;

  const client = useApolloClient();

  const { data, loading, error } = useQuery<
    GetTileQuery,
    GetTileQueryVariables
  >(
    gql`
      query GetTile($islandId: String!, $position: Int!) {
        tile(islandId: $islandId, position: $position) {
          ... on Tile {
            id
            position
            kind
            infrastructure
            level
            maxLevel
            desiredStatus
            currentStatus
            population
            energy
            material
            food
            frozenFood
            frozenFoodStorage
            constructionSite {
              id
              infrastructure
              workloadLeft
              finishedOn
            }
            blueprints {
              infrastructure
              materialCost
              workload
            }
            jobPositions {
              title
              seats
              requiredTalent {
                talent
                target
              }
            }
            employees {
              citizen {
                id
                name
                skillSet {
                  skill
                  level
                }
              }
              title
              salary
              currency {
                id
                code
                name
              }
            }
            energyFulfillment {
              current
            }
            fulfillmentSummary {
              current
              requirement
            }
            energyFulfillment {
              current
              requirement
            }
            skillFulfillments {
              title
              skill
              current
              requirement
            }
          }
        }
      }
    `,
    { variables: { islandId, position }, pollInterval: 2_000 },
  );

  if (data?.tile.__typename === 'NotFound') {
    return <Error>Sorry, this island does not exist.</Error>;
  }

  let tile: Tile;
  let blueprints = new Array<Blueprint>();
  let constructionSite = new ConstructionSite(null);
  if (data?.tile.__typename === 'Tile') {
    tile = new Tile(data.tile);

    constructionSite = new ConstructionSite(data.tile.constructionSite);

    data.tile.blueprints.forEach((bp) => {
      blueprints.push(new Blueprint(bp));
    });
  } else if (error) {
    return <Error>Sorry, an error occured.</Error>;
  } else {
    tile = new Tile({});
  }

  const jobPositions: JobPosition[] = [];
  let requiredTalent = 1;
  let currentTalent = 1;
  let efficiency = 1;
  let efficiencyStr = '100%';

  if (data?.tile.__typename === 'Tile') {
    for (const jobPosition of data.tile.jobPositions) {
      let skillFulfillmentSummaryCurrent = 1;
      let skillFulfillmentSummaryRequirement = 1;
      for (const sf of data.tile.skillFulfillments) {
        if (sf.title !== jobPosition.title) {
          continue;
        }

        if (
          sf.current / sf.requirement <
          skillFulfillmentSummaryCurrent / skillFulfillmentSummaryRequirement
        ) {
          skillFulfillmentSummaryCurrent = sf.current;
          skillFulfillmentSummaryRequirement = sf.requirement;
        }
      }

      const job: JobPosition = {
        position: jobPosition,
        employees: data.tile.employees.filter(
          (e) => e.title === jobPosition.title,
        ),
        skillFulfillments: data.tile.skillFulfillments.filter(
          (sf) => sf.title === jobPosition.title,
        ),
        skillFulfillmentSummary: {
          current: skillFulfillmentSummaryCurrent,
          requirement: skillFulfillmentSummaryRequirement,
        },
        fulfillmentSummary: {
          current: data.tile.fulfillmentSummary.current,
          requirement: data.tile.fulfillmentSummary.requirement,
        },
      };

      jobPositions.push(job);

      if (jobPosition.seats > job.employees.length) {
        for (let i = job.employees.length; i < jobPosition.seats; i++) {
          job.employees.push({
            citizen: {
              id: '',
              name: '',
              skillSet: [],
            },
            title: jobPosition.title,
            salary: 0,
            currency: {
              id: '',
              code: '',
              name: '',
            },
          });
        }
      }

      job.employees.sort((a, b) => {
        if (a.citizen.name === '' && b.citizen.name === '') {
          return 0;
        } else if (a.citizen.name === '') {
          return 1;
        } else if (b.citizen.name === '') {
          return -1;
        }

        return a.citizen.name.localeCompare(b.citizen.name);
      });
    }

    currentTalent = data.tile.fulfillmentSummary.current;
    requiredTalent = data.tile.fulfillmentSummary.requirement;
    efficiency = requiredTalent === 0 ? 1 : currentTalent / requiredTalent;
    efficiencyStr = (efficiency * 100).toFixed(2) + '%';
  }

  return (
    <Fragment>
      <h1>Tile {position}</h1>
      {loading && <p>Loading...</p>}
      {!loading && (
        <Fragment>
          <h2>Description</h2>
          <p>
            <b>Kind:</b> {tile.kindName()}
            <br />
            <b>Infrastructure:</b> {tile.infrastructure.toLowerCase()}
            <br />
            <b>Level:</b> {tile.level}
            <br />
            <b>Maximum level:</b> {tile.maxLevel > 100 ? '∞' : tile.maxLevel}
            <br />
            <b>Desired status:</b> {tile.desiredStatus}
            <br />
            <b>Current status:</b> {tile.currentStatus}
            <br />
            <b>Talent:</b> {currentTalent} / {requiredTalent} ({efficiencyStr})
          </p>
          <div
            style={{
              height: '50px',
              width: '50px',
            }}
          >
            <TileStatusToggle islandId={islandId} position={tile.position} />
          </div>
          <h2>Production</h2>
          <p>
            <b>Population:</b> {tile.population}
            <br />
            <b>Energy:</b> {tile.energy}
            {tile.material !== 0 && (
              <>
                <br />
                <b>Material:</b> {Math.floor(tile.material * efficiency)}/s (
                {efficiencyStr} of {tile.material})
              </>
            )}
            {tile.food !== 0 && (
              <>
                <br />
                <b>Food:</b> {Math.floor(tile.food * efficiency)}/s (
                {efficiencyStr} of {tile.food})
              </>
            )}
            {tile.frozenFood !== 0 && (
              <>
                <br />
                <b>Frozen food:</b> {Math.floor(tile.frozenFood * efficiency)}/s
                ({efficiencyStr} of {tile.frozenFood})
              </>
            )}
            {tile.frozenFoodStorage !== 0 && (
              <>
                <br />
                <b>Frozen food storage:</b>{' '}
                {Math.floor(tile.frozenFoodStorage * efficiency)}(
                {efficiencyStr} of {tile.frozenFoodStorage}){' '}
              </>
            )}
          </p>
          <h2>Infrastructure</h2>
          {tile.level === 0 && !constructionSite.exists && (
            <UpgradeTableStyle>
              <tbody>
                {blueprints.map((bp) => {
                  return (
                    <InfrastructureOption
                      key={Math.random()}
                      islandId={islandId}
                      position={position}
                      bp={bp}
                    />
                  );
                })}
              </tbody>
            </UpgradeTableStyle>
          )}
          {constructionSite.exists && (
            <Fragment>
              <p>
                There is a construction in progress to upgrade this{' '}
                <b>{tile.infrastructure.toLowerCase()}</b> to{' '}
                <b>level {tile.level + 1}</b>. It will be done{' '}
                <b>
                  <TimeLeft
                    target={DateTime.fromSeconds(constructionSite.finishedOn)}
                    onReach={() => {
                      client.cache.evict({
                        id: 'ConstructionSite:' + constructionSite.id,
                      });
                    }}
                  />
                </b>
                .
              </p>
              <CancelButton islandId={islandId} position={position} />
            </Fragment>
          )}
          {tile.level !== 0 &&
            blueprints.length === 1 &&
            !constructionSite.exists &&
            tile.level < tile.maxLevel && (
              <Fragment>
                <UpgradeButton
                  islandId={islandId}
                  position={position}
                  cost={blueprints[0].materialCost}
                />
                <span>
                  You can upgrade for{' '}
                  {ShortenNumber(blueprints[0].materialCost)} material. It would
                  take{' '}
                  {blueprints[0].durationWithWorkersStr(
                    inventory.populationFree,
                  )}
                  .
                </span>
              </Fragment>
            )}
          {tile.level !== 0 && !constructionSite.exists && (
            <Fragment>
              <DestroyButton islandId={islandId} position={position} />
            </Fragment>
          )}
          {jobPositions.length > 0 && <h2>Jobs</h2>}
          {jobPositions.length > 0 && (
            <small>
              The effective fulfillment for a given position is equal to the
              least fulfilled of its required talents.
            </small>
          )}
          {jobPositions.length > 0 &&
            jobPositions.map((jobPosition: JobPosition) => {
              return (
                <JobPositions tileId={tile.id} job={jobPosition}></JobPositions>
              );
            })}
        </Fragment>
      )}
    </Fragment>
  );
};

const UpgradeTableStyle = styled.table`
  tr {
    height: 50px;

    td:first-child {
      width: 32px;

      img {
        display: block;
      }
    }

    td:nth-child(2) {
      width: 100%;
    }

    td:nth-child(3) {
      min-width: 80px;

      span {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        justify-content: flex-start;
        gap: 4px;

        img {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
`;

const InfrastructureOption: FunctionComponent<{
  islandId: string;
  position: number;
  bp: Blueprint;
}> = ({ islandId, position, bp }) => {
  let [error, setError] = useState<string | undefined>(undefined);

  const inventory = useContext(InventoryContext);

  let infra = bp.infrastructure;

  const [build] = useMutation<
    BuildInfrastructureMutation,
    BuildInfrastructureMutationVariables
  >(
    gql`
      mutation BuildInfrastructure(
        $islandId: String!
        $position: Int!
        $infrastructure: Infrastructure!
      ) {
        buildInfrastructure(
          islandId: $islandId
          position: $position
          infrastructure: $infrastructure
        ) {
          ... on Tile {
            id
            infrastructure
            level
            constructionSite {
              id
              infrastructure
              workloadLeft
              finishedOn
              tile {
                position
              }
            }
            blueprints {
              infrastructure
              materialCost
              workload
            }
            island {
              id
              inventory {
                id
                material
              }
            }
          }
        }
      }
    `,
    {
      variables: { islandId, position, infrastructure: infra },
      update: (cache, data) => {
        cache.modify({
          id: 'Island:' + islandId,
          fields: {
            constructionSites: (currentConstructionSites) => {
              if (
                data.data?.buildInfrastructure?.__typename !== 'Tile' ||
                !data.data.buildInfrastructure.constructionSite
              ) {
                return currentConstructionSites;
              }

              const newSiteRef =
                cache.writeFragment<NewConstructionSiteFragment>({
                  data: data.data.buildInfrastructure.constructionSite,
                  fragment: gql`
                    fragment NewConstructionSite on ConstructionSite {
                      id
                      infrastructure
                      workloadLeft
                      finishedOn
                      tile {
                        position
                      }
                    }
                  `,
                });

              const updatedSites = [...currentConstructionSites];
              if (newSiteRef) {
                updatedSites.push(newSiteRef);
              }

              return updatedSites;
            },
          },
        });
      },
    },
  );

  return (
    <tr>
      {error !== undefined && (
        <td colSpan={5}>
          <Error
            onConfirmation={() => {
              setError(undefined);
            }}
          >
            {error}
          </Error>
        </td>
      )}
      {error === undefined && (
        <Fragment>
          <td>
            <img src={bp.iconUrl()} alt={bp.name()} height={32} width={32} />
          </td>
          <td>
            <b>{bp.name()}</b>
          </td>
          <td>
            <span>
              <img src="https://icons.arkipel.io/res/material.svg" />
              {ShortenNumber(bp.materialCost)}
            </span>
          </td>
          <td>{bp.durationWithWorkersStr(inventory.populationFree)}</td>
          <td>
            <Button
              onClick={() => {
                let res = build();
                res
                  .then((r) => {
                    if (
                      r.data?.buildInfrastructure?.__typename ===
                      'NotEnoughMaterial'
                    ) {
                      setError('You do not have enough material.');
                    }
                  })
                  .catch(() => {
                    setError('An unknown error occured. Please try again.');
                  });
              }}
              disabled={inventory.material < bp.materialCost}
            >
              Build
            </Button>
          </td>
        </Fragment>
      )}
    </tr>
  );
};

const CancelButton: FunctionComponent<{
  islandId: string;
  position: number;
}> = ({ islandId, position }) => {
  const [cancel, { loading, error }] = useMutation(
    gql`
      mutation CancelConstruction($islandId: String!, $position: Int!) {
        cancelConstruction(islandId: $islandId, position: $position) {
          ... on Tile {
            id
            position
            infrastructure
            level
            constructionSite {
              id
            }
            blueprints {
              infrastructure
              materialCost
              workload
            }
            island {
              id
              inventory {
                id
                material
              }
            }
          }
        }
      }
    `,
    {
      variables: { islandId, position },
      update: (cache) => {
        cache.modify({
          id: 'Island:' + islandId,
          fields: {
            constructionSites: (currentConstructionSites) => {
              return currentConstructionSites.filter((cs: any) => {
                let ref = cs.__ref as string;
                return !ref.includes('_' + position + '_');
              });
            },
          },
        });
      },
    },
  );

  return (
    <Fragment>
      <Button
        onClick={() => {
          cancel();
        }}
        disabled={loading}
      >
        {loading && 'Cancelling...'}
        {!loading && 'Cancel'}
      </Button>
      <Error visible={error !== undefined}>
        Could not cancel. Maybe the construction was already done. If not, try
        again.
      </Error>
    </Fragment>
  );
};

const UpgradeButton: FunctionComponent<{
  islandId: string;
  position: number;
  cost: number;
}> = ({ islandId, position, cost }) => {
  const inventory = useContext(InventoryContext);

  const [upgrade, { loading, error }] = useMutation(
    gql`
      mutation UpgradeInfrastructure($islandId: String!, $position: Int!) {
        upgradeInfrastructure(islandId: $islandId, position: $position) {
          ... on Tile {
            id
            infrastructure
            level
            constructionSite {
              id
              infrastructure
              workloadLeft
              finishedOn
              tile {
                position
              }
            }
            blueprints {
              infrastructure
              materialCost
              workload
            }
            island {
              id
              inventory {
                id
                material
              }
            }
          }
        }
      }
    `,
    {
      variables: { islandId, position },
      update: (cache, data) => {
        cache.modify({
          id: 'Island:' + islandId,
          fields: {
            constructionSites: (currentConstructionSites) => {
              const newSiteRef =
                cache.writeFragment<NewConstructionSiteFragment>({
                  data: data.data.upgradeInfrastructure.constructionSite,
                  fragment: gql`
                    fragment NewConstructionSite on ConstructionSite {
                      id
                      infrastructure
                      workloadLeft
                      finishedOn
                      tile {
                        position
                      }
                    }
                  `,
                });
              return [...currentConstructionSites, newSiteRef];
            },
          },
        });
      },
    },
  );

  return (
    <Fragment>
      <Button
        onClick={() => {
          upgrade();
        }}
        disabled={loading || inventory.material < cost}
      >
        {loading && 'Upgrading...'}
        {!loading && 'Upgrade'}
      </Button>
      <Error visible={error !== undefined}>Could not upgrade, try again.</Error>
    </Fragment>
  );
};

const DestroyButton: FunctionComponent<{
  islandId: string;
  position: number;
}> = ({ islandId, position }) => {
  const [cancel, { loading, error }] = useMutation(
    gql`
      mutation DestroyInfrastructure($islandId: String!, $position: Int!) {
        destroyInfrastructure(islandId: $islandId, position: $position) {
          ... on Tile {
            id
            infrastructure
            level
            constructionSite {
              finishedOn
            }
            blueprints {
              infrastructure
              materialCost
              workload
            }
          }
        }
      }
    `,
    { variables: { islandId, position } },
  );

  return (
    <Fragment>
      <Button
        onClick={() => {
          cancel();
        }}
        disabled={loading}
      >
        {loading && 'Destroying...'}
        {!loading && 'Destroy'}
      </Button>
      <Error visible={error !== undefined}>
        Could not destroy. Maybe the infrastructure was already destroyed. If
        not, try again.
      </Error>
    </Fragment>
  );
};

const JobPositions: FunctionComponent<{
  tileId: string;
  job: JobPosition;
}> = ({ tileId, job }) => {
  return (
    <StyledJobPositions>
      <h3>
        {job.position.title} (
        {job.employees.filter((emp) => emp.citizen.id !== '').length}/
        {job.employees.length})
      </h3>
      <h4>Required talent</h4>
      <p>
        Effective: {job.skillFulfillmentSummary.current}/
        {job.skillFulfillmentSummary.requirement}
      </p>
      {job.position.requiredTalent.map((required) => {
        return (
          <p key={required.talent}>
            {required.talent.replace('_', ' ').toLowerCase()} (
            {job.skillFulfillments?.find((sf) => sf.skill === required.talent)
              ?.current || 0}
            /
            {job.skillFulfillments?.find((sf) => sf.skill === required.talent)
              ?.requirement || 0}
            )
          </p>
        );
      })}
      {job.employees.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Skills</th>
            </tr>
          </thead>
          <tbody>
            {job.employees
              .filter((emp) => emp.citizen.id !== '')
              .map((emp) => {
                return (
                  <tr key={Math.random()}>
                    {emp.citizen.id !== '' && (
                      <>
                        <td>{emp.citizen.name}</td>
                        <td>
                          <div className="skills">
                            {emp.citizen.skillSet
                              .filter((skill) => {
                                for (const required of job.position
                                  .requiredTalent) {
                                  if (skill.skill !== required.talent) {
                                    continue;
                                  }

                                  return true;
                                }

                                return false;
                              })
                              .map((skill) => {
                                const name = skill.skill
                                  .replace('_', ' ')
                                  .toLocaleLowerCase();

                                return (
                                  <span
                                    className="skill"
                                    key={emp.citizen.id + '_' + skill.skill}
                                  >
                                    <span className="name">{name}</span>
                                    <span className="level">{skill.level}</span>
                                  </span>
                                );
                              })}
                          </div>
                        </td>
                      </>
                    )}
                    {emp.citizen.id === '' && (
                      <>
                        <td colSpan={2}>Unfilled position</td>
                      </>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </StyledJobPositions>
  );
};

const StyledJobPositions = styled.div`
  display: grid;
  gap: 10px;

  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;

    .skill {
      display: inline-block;
      display: block;
      font-size: 12px;
      border-radius: 4px;

      .name {
        display: inline-block;
        padding: 4px 6px;
        border: 1px solid #ddd;
        border-right: 0;
        border-radius: 4px 0 0 4px;
      }

      .level {
        display: inline-block;
        padding: 4px 6px;
        // font-size: 0.8em;
        // color: gray;
        background: #ddd;
        border: 1px solid #ddd;
        border-radius: 0 4px 4px 0;
      }
    }
  }
`;

type JobPosition = {
  position: Extract<
    GetTileQuery['tile'],
    { __typename?: 'Tile' }
  >['jobPositions'][number];
  employees: Extract<
    GetTileQuery['tile'],
    { __typename?: 'Tile' }
  >['employees'];
  energyFulfillment?: Extract<
    GetTileQuery['tile'],
    { __typename?: 'Tile' }
  >['energyFulfillment'];
  skillFulfillments?: Extract<
    GetTileQuery['tile'],
    { __typename?: 'Tile' }
  >['skillFulfillments'];
  skillFulfillmentSummary: { current: number; requirement: number };
  fulfillmentSummary?: {
    current: number;
    requirement: number;
  };
};

export default TilePage;
