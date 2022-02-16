import { DateTime, Duration } from 'luxon';

class Inventory {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.lastUpdate = DateTime.fromISO(obj?.island?.lastUpdateAt);
    this.populationUsed = obj?.populationUsed || 0;
    this.populationFree = obj?.populationFree || 0;
    this.populationTotal = obj?.populationTotal || 0;
    this.energyUsed = obj?.energyUsed || 0;
    this.energyFree = obj?.energyFree || 0;
    this.energyTotal = obj?.energyTotal || 0;
    this.materialProduction = obj?.materialProduction || 0;
    this.material = obj?.material || 0;
    this.foodProduction = obj?.foodProduction || 0;
    this.food = obj?.food || 0;
    this.frozenFoodProduction = obj?.frozenFoodProduction || 0;
    this.frozenFood = obj?.frozenFood || 0;
    this.frozenFoodStorage = obj?.frozenFoodStorage || 0;
    this.bankLevels = obj?.bankLevels || 0;
  }

  id: string;
  lastUpdate?: DateTime;
  populationUsed: number;
  populationFree: number;
  populationTotal: number;
  energyUsed: number;
  energyFree: number;
  energyTotal: number;
  materialProduction: number;
  material: number;
  foodProduction: number;
  food: number;
  frozenFoodProduction: number;
  frozenFood: number;
  frozenFoodStorage: number;
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
