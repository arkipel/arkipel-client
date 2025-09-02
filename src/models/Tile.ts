import {
  TileKind,
  Infrastructure,
  InfrastructureStatus,
} from '../generated/graphql';

import ConstructionSite from './ConstructionSite';

class Tile {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.islandId = obj?.island?.id || '';
    this.position = obj?.position || 0;
    this.infrastructure = obj?.infrastructure || Infrastructure.Empty;
    this.level = obj?.level || 0;
    this.maxLevel = obj?.maxLevel || 0;
    this.desiredStatus =
      obj?.desiredStatus === InfrastructureStatus.Off
        ? InfrastructureStatus.Off
        : InfrastructureStatus.On;
    this.currentStatus =
      obj?.currentStatus === InfrastructureStatus.Off
        ? InfrastructureStatus.Off
        : InfrastructureStatus.On;
    this.population = obj?.population || 0;
    this.material = obj?.materialProduction || 0;
    this.energy = obj?.energyProduction || 0;
    this.food = obj?.foodProduction || 0;
    this.frozenFood = obj?.frozenFoodProduction || 0;
    this.frozenFoodStorage = obj?.frozenFoodStorage || 0;
    this.isActive = obj?.isActive === true ? true : false;
    this.energyProduction = obj?.energyProduction || 0;
    this.materialProduction = obj?.materialProduction || 0;
    this.foodProduction = obj?.foodProduction || 0;
    this.frozenFoodProduction = obj?.frozenFoodProduction || 0;
    this.constructionSite = obj?.constructionSite || null;

    const current = obj?.fulfillmentSummary?.current || 0;
    const required = obj?.fulfillmentSummary?.requirement || 1;
    this.effectiveness = ((current / required) * 100).toFixed(0) + '%';
  }

  id: string;
  islandId: string;
  position: number;
  infrastructure: Infrastructure;
  level: number;
  maxLevel: number;
  desiredStatus: InfrastructureStatus;
  currentStatus: InfrastructureStatus;
  population: number;
  material: number;
  food: number;
  frozenFood: number;
  frozenFoodStorage: number;
  energy: number;
  isActive: boolean;
  energyProduction: number;
  materialProduction: number;
  foodProduction: number;
  frozenFoodProduction: number;
  constructionSite: ConstructionSite;
  effectiveness: string;

  kind(): TileKind {
    switch (dna[this.position]) {
      case '1':
        return TileKind.Water;
      case '2':
        return TileKind.Sand;
      case '3':
        return TileKind.Land;
      default:
        return TileKind.DeepWater;
    }
  }

  kindName(): string {
    switch (this.kind()) {
      case TileKind.DeepWater:
        return 'deep water';
      case TileKind.Water:
        return 'water';
      case TileKind.Sand:
        return 'sand';
      case TileKind.Land:
        return 'land';
    }
  }

  infrastructureName(): string {
    switch (this.infrastructure) {
      case Infrastructure.Empty:
        return 'empty';
      case Infrastructure.Jungle:
        return 'jungle';
      case Infrastructure.Quarry:
        return 'quarry';
      case Infrastructure.Apartments:
        return 'apartments';
      case Infrastructure.House:
        return 'house';
      case Infrastructure.WheatField:
        return 'wheat field';
      case Infrastructure.AnimalFarm:
        return 'animal farm';
      case Infrastructure.NuclearPlant:
        return 'nuclear plant';
      case Infrastructure.WindTurbine:
        return 'wind turbine';
      case Infrastructure.Port:
        return 'port';
      case Infrastructure.Hut:
        return 'hut';
      case Infrastructure.Warehouse:
        return 'warehouse';
      case Infrastructure.Garden:
        return 'garden';
    }
  }

  isStalled(): boolean {
    return (
      this.desiredStatus === InfrastructureStatus.On &&
      this.currentStatus === InfrastructureStatus.Off
    );
  }
}

export default Tile;

const dna =
  '0011111100' +
  '0112222110' +
  '1122332211' +
  '1223333221' +
  '1233333321' +
  '1233333321' +
  '1223333221' +
  '1122332211' +
  '0112222110' +
  '0011111100';
