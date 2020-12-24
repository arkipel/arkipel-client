import { Duration } from 'luxon';

import { Infrastructure } from '../generated/globalTypes';

class Tile {
  constructor(obj: any) {
    this.infrastructure = obj?.infrastructure || '';
    this.materialCost = obj?.materialCost || 0;

    let seconds = obj?.workload || 0;
    this.duration = Duration.fromObject({ seconds });
    this.duration = this.duration.normalize();
  }

  infrastructure: Infrastructure;
  materialCost: number;
  duration: Duration;

  name(): string {
    let name: string = Infrastructure[this.infrastructure];
    name = name[0].toUpperCase() + name.substring(1).toLocaleLowerCase();
    name = name.replace('_', ' ');
    return name;
  }

  iconUrl(): string {
    return (
      'https://icons.arkipel.io/infra/' +
      this.infrastructure.toLowerCase() +
      '.svg'
    );
  }

  durationStr(): string {
    return this.duration.toFormat('hh:mm:ss');
  }
}

export default Tile;
