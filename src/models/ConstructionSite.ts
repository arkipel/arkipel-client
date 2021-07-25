import { DateTime } from 'luxon';

import { Infrastructure } from '../generated/globalTypes';
import Tile from './Tile';

class ConstructionSite {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.tile = new Tile(obj?.tile || {});
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
  tile: Tile;
  tilePosition: number;
  exists: boolean;
  infrastructure: Infrastructure;
  finishedAt: DateTime;
}

export default ConstructionSite;
