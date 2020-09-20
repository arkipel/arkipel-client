class Inventory {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.population = obj?.population || 0;
    this.workforce = obj?.workforce || 0;
    this.material = obj?.material || 0;
    this.materialProduction = obj?.materialProduction || 0;
    this.energyUsed = obj?.energyUsed || 0;
    this.energy = obj?.energy || 0;
    this.bankLevels = obj?.bankLevels || 0;
  }

  id: string;
  population: number;
  workforce: number;
  material: number;
  materialProduction: number;
  energyUsed: number;
  energy: number;
  bankLevels: number;
}

export default Inventory;
