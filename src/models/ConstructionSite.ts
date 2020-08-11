import { DateTime } from 'luxon';

import { Infrastructure } from '../generated/globalTypes';

class Construction {
  constructor(obj: any) {
    this.exists = false;
    this.infrastructure = Infrastructure.EMPTY;
    this.finishedAt = DateTime.utc();

    if (obj) {
      this.exists = true;
      this.infrastructure = obj.infrastructure || Infrastructure.EMPTY;
      this.finishedAt = DateTime.fromISO(obj.finishedAt) || DateTime.utc();
    }
  }

  exists: boolean;
  infrastructure: Infrastructure;
  finishedAt: DateTime;
}

export default Construction;
