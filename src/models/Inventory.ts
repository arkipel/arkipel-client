class Inventory {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.population = obj?.population || 0;
    this.material = obj?.material || 0;
    this.energyUsed = obj?.energyUsed || 0;
    this.energy = obj?.energy || 0;
  }

  id: string;
  population: number;
  material: number;
  energyUsed: number;
  energy: number;
}

export default Inventory;
