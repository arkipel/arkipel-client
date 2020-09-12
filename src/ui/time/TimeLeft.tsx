import React, { FunctionComponent, useState, useEffect } from 'react';

import { DateTime } from 'luxon';

const TimeLeft: FunctionComponent<props> = ({ target, onReach }) => {
  const [, forceUpdate] = useState(0);
  const [reached, setReached] = useState(false);

  // When the target is reached, onReach is
  // called (on once).
  let now = DateTime.utc();
  if (!reached && now >= target && onReach) {
    setReached(true);
    onReach();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate(Math.random());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <span>{target.toRelative()}</span>;
};

interface props {
  target: DateTime;
  onReach?: () => void;
}

export default TimeLeft;
