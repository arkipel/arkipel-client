import { DateTime, Duration } from 'luxon';

class Inventory {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.lastUpdate = DateTime.fromISO(obj?.island?.lastUpdateAt);
    this.population = obj?.population || 0;
    this.energy = obj?.energy || 0;
    this.materialProduction = obj?.materialProduction || 0;
    this.material = obj?.material || 0;
    this.bankLevels = obj?.bankLevels || 0;
  }

  id: string;
  lastUpdate?: DateTime;
  population: number;
  energy: number;
  materialProduction: number;
  material: number;
  bankLevels: number;

  sinceLastUpdate = (): Duration => {
    if (!this.lastUpdate) {
      return Duration.fromMillis(0);
    }

    let diff = DateTime.utc().diff(this.lastUpdate);
    if (diff.milliseconds < 0) {
      diff = Duration.fromMillis(0);
    }

    return diff;
  };
}

export default Inventory;
