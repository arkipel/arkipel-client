import React, {
  Fragment,
  FunctionComponent,
  useContext,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';

import { useQuery, gql, useMutation, useApolloClient } from '@apollo/client';
import {
  BuildInfrastructureMutation,
  BuildInfrastructureMutationVariables,
  NewConstructionSiteFragment,
  GetTileQuery,
  GetTileQueryVariables,
  JobPosition,
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
import { Info, Success, Error } from '../../ui/dialog/Msg';
import { Form } from '../../ui/form/Form';
import { Submit, Input } from '../../ui/form/Input';

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
            talent {
              requirement {
                talent
                target
              }
              current
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
              }
              title
              salary
              currency {
                id
                code
                name
              }
            }
          }
        }
      }
    `,
    { variables: { islandId, position } },
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

  if (data?.tile.__typename === 'Tile') {
    jobPositions.push(...data.tile.jobPositions);
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
                <b>Material:</b> {tile.material}/s
              </>
            )}
            {tile.food !== 0 && (
              <>
                <br />
                <b>Food:</b> {tile.food}/s
              </>
            )}
            {tile.frozenFood !== 0 && (
              <>
                <br />
                <b>Frozen food:</b> {tile.frozenFood}/s
              </>
            )}
            {tile.frozenFoodStorage !== 0 && (
              <>
                <br />
                <b>Frozen food storage:</b> {tile.frozenFoodStorage}
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
          {jobPositions.length > 0 &&
            jobPositions.map((jobPosition: JobPosition) => {
              return <Job tileId={tile.id} roleName={jobPosition.title}></Job>;
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
              <img src="https://arkipel-icons.pages.dev/res/material.svg" />
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

const Job: FunctionComponent<{
  tileId: string;
  roleName: string;
}> = ({ tileId, roleName }) => {
  const [submit, { loading, error }] = useMutation(
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
    { variables: { tileId, roleName } },
  );

  const formFunctions = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  });
  const { register, formState, handleSubmit, getValues } = formFunctions;

  return (
    <Fragment>
      <h3>{roleName}</h3>
      <p>
        Positions: 2<br />
        Filled: 2<br />
        Available: 0
      </p>
      <h4>Strategy</h4>
      <FormProvider {...formFunctions}>
        <Form
          onSubmit={formFunctions.handleSubmit((formData) => {
            submit({
              variables: {
                username: formData.username,
                password: formData.password,
              },
            });
          })}
        >
          <p>
            Talent goal:{' '}
            <Input
              type="number"
              defaultValue={0}
              {...register('talent_target', {
                required: true,
                min: 0,
              })}
            />{' '}
            (max: 2)
          </p>
          <p>
            Budget:{' '}
            <Input
              type="number"
              defaultValue={0}
              {...register('budget', {
                required: true,
                min: 0,
              })}
            />{' '}
            ARK
          </p>
          <p>
            Attempt to reach {getValues('talent_target')} talent with{' '}
            {getValues('budget')} ARK.
          </p>
          <Submit value="Submit" disabled={!formState.isValid || loading} />
          {/* <UsernameInput disabled={registered} />
          <PasswordInput disabled={registered} />
          <HCaptcha
            // sitekey="10000000-ffff-ffff-ffff-000000000001"
            sitekey="36cde9f3-38a3-4fd7-9314-bac28f55545b"
            onVerify={(c: string) => {
              setCaptcha(c);
            }}
            onExpire={() => {
              setCaptcha('');
            }}
          ></HCaptcha>
          <p>
            <Submit value="Register" disabled={!allowSubmit || loading} />
          </p> */}
        </Form>
      </FormProvider>
      {/* <table>
            <thead>
              <tr>
                <th>Roles</th>
                <th>Positions</th>
                <th>Requirements</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Manager</td>
                <td>2 filled, 0 available</td>
                <td>Management, leadership</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Farmer</td>
                <td>2 filled, 0 available</td>
                <td>Farming</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
          <p>
            Positions: 2<br />
            Filled: 2<br />
            Available: 0
          </p> */}
      <h4>Employees</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Skills</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Oliver Snake-Yolo</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Stef Powder-King</td>
            <td>1</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default TilePage;
