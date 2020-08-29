import { TileKind, Infrastructure } from '../generated/globalTypes';

class Tile {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.position = obj?.position || 0;
    this.kind = obj?.kind || TileKind.LAND;
    this.infrastructure = obj?.infrastructure || Infrastructure.EMPTY;
    this.level = obj?.level || 0;
  }

  id: string;
  position: number;
  kind: TileKind;
  infrastructure: Infrastructure;
  level: number;

  kindName(): string {
    switch (this.kind) {
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
}

export default Tile;
