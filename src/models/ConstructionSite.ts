import { DateTime } from 'luxon';

import { Infrastructure } from '../generated/globalTypes';

class ConstructionSite {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.tilePosition = obj?.tile?.position || 0;
    this.exists = false;
    this.infrastructure = Infrastructure.EMPTY;
    this.finishedAt = DateTime.utc();

    if (obj) {
      this.exists = true;
      this.infrastructure = obj.infrastructure || Infrastructure.EMPTY;
      this.finishedAt = DateTime.fromISO(obj.finishedAt) || DateTime.utc();
    }
  }

  id: string;
  tilePosition: number;
  exists: boolean;
  infrastructure: Infrastructure;
  finishedAt: DateTime;
}

export default ConstructionSite;
