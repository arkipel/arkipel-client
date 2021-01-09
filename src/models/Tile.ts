import {
  TileKind,
  Infrastructure,
  InfrastructureStatus,
} from '../generated/globalTypes';

class Tile {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.islandId = obj?.island?.id || '';
    this.position = obj?.position || 0;
    this.infrastructure = obj?.infrastructure || Infrastructure.EMPTY;
    this.level = obj?.level || 0;
    this.desiredStatus =
      obj?.desiredStatus === InfrastructureStatus.OFF
        ? InfrastructureStatus.OFF
        : InfrastructureStatus.ON;
    this.currentStatus =
      obj?.currentStatus === InfrastructureStatus.OFF
        ? InfrastructureStatus.OFF
        : InfrastructureStatus.ON;
    this.population = obj?.population || 0;
    this.material = obj?.material || 0;
    this.energy = obj?.energy || 0;
    this.isActive = obj?.isActive === true ? true : false;
    this.materialProduction = obj?.materialProduction || 0;
  }

  id: string;
  islandId: string;
  position: number;
  infrastructure: Infrastructure;
  level: number;
  desiredStatus: InfrastructureStatus;
  currentStatus: InfrastructureStatus;
  population: number;
  material: number;
  energy: number;
  isActive: boolean;
  materialProduction: number;

  kind(): TileKind {
    switch (dna[this.position]) {
      case '1':
        return TileKind.WATER;
      case '2':
        return TileKind.SAND;
      case '3':
        return TileKind.LAND;
      default:
        return TileKind.DEEP_WATER;
    }
  }

  kindName(): string {
    switch (this.kind()) {
      case TileKind.DEEP_WATER:
        return 'deep water';
      case TileKind.WATER:
        return 'water';
      case TileKind.SAND:
        return 'sand';
      case TileKind.LAND:
        return 'land';
    }
  }

  infrastructureName(): string {
    switch (this.infrastructure) {
      case Infrastructure.EMPTY:
        return 'empty';
      case Infrastructure.JUNGLE:
        return 'jungle';
      case Infrastructure.QUARRY:
        return 'quarry';
      case Infrastructure.APARTMENTS:
        return 'apartments';
      case Infrastructure.HOUSE:
        return 'house';
      case Infrastructure.WHEAT_FIELD:
        return 'wheat field';
      case Infrastructure.ANIMAL_FARM:
        return 'animal farm';
      case Infrastructure.NUCLEAR_PLANT:
        return 'nuclear plant';
      case Infrastructure.WIND_TURBINE:
        return 'wind turbine';
      case Infrastructure.PORT:
        return 'port';
      case Infrastructure.BANK:
        return 'bank';
    }
  }

  isStalled(): boolean {
    return (
      this.desiredStatus === InfrastructureStatus.ON &&
      this.currentStatus === InfrastructureStatus.OFF
    );
  }
}

export default Tile;

const dna =
  '0000000000000000' +
  '0000011111100000' +
  '0001112222111000' +
  '0011222332221100' +
  '0012233333322100' +
  '0112333333332110' +
  '0122333333332210' +
  '0123333333333210' +
  '0123333333333210' +
  '0122333333332210' +
  '0112333333332110' +
  '0012233333322100' +
  '0011222332221100' +
  '0001112222111000' +
  '0000011111100000' +
  '0000000000000000';
