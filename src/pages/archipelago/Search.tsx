import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';

import { gql, useLazyQuery } from '@apollo/client';
import { SearchIslands as SearchIslands } from 'generated/SearchIslands';

import Island from '../../models/Island';

import { HintError } from '../../ui/dialog/Hint';
import { Form } from '../../ui/form/Form';
import { Input } from '../../ui/form/Input';

const SearchIslandsPage = () => {
  const [term, setTerm] = useState('');

  // Form
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  let [search, { data, loading }] = useLazyQuery<SearchIslands>(
    gql`
      query SearchIslands($term: String!) {
        searchIslands(term: $term) {
          ... on IslandList {
            islands {
              id
              name
            }
          }
        }
      }
    `,
    { variables: { term } },
  );

  let list = new Array<Island>();
  if (data?.searchIslands?.__typename === 'IslandList') {
    let islands = data.searchIslands.islands;
    islands.forEach((island) => {
      list.push(new Island(island));
    });
  }

  let errorMsgs = Object.values(errors.term?.types || {}).join(', ');

  return (
    <Fragment>
      <h1>Search islands</h1>
      <Form>
        <p>
          <Input
            type="text"
            placeholder="Term"
            {...register('term', {
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: 'invalid characters',
              },
            })}
            onChange={(e) => {
              let term = e.target.value;
              setTerm(term);
              search({ variables: { term } });
            }}
          />
          {errorMsgs && (
            <Fragment>
              <br />
              <HintError>{errorMsgs}</HintError>
            </Fragment>
          )}
        </p>
      </Form>
      <div>
        {loading && <p>Loading...</p>}
        {!loading && list.length === 0 && <p>No results</p>}
        {!loading &&
          list.length > 0 &&
          list.map((island) => {
            return <p key={island.id}>Island {island.name}</p>;
          })}
      </div>
    </Fragment>
  );
};

export default SearchIslandsPage;
