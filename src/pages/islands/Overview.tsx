import React, { Fragment, FunctionComponent } from 'react';

import Island from '../../models/Island';

const IslandOverview: FunctionComponent<props> = ({ island }) => {
  return (
    <Fragment>
      <h2>Overview</h2>
      <p>
        <b>Owner:</b> {island.owner.username}
        <br />
        <b>Population:</b> 0
      </p>
    </Fragment>
  );
};

class props {
  island: Island = new Island({});
}

export default IslandOverview;
