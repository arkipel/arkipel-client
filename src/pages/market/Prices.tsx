import React, { Fragment } from 'react';

import LineChart from '../../ui/chart/LineChart';

const PricesPage = () => {
  return (
    <Fragment>
      <h1>Prices</h1>
      <p>Those are the prices.</p>
      <LineChart height={200} width={300} />
      <p>Those were the prices.</p>
    </Fragment>
  );
};

export default PricesPage;
