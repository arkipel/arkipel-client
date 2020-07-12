import Tile from '../models/Tile';

import { TileKind } from '../generated/globalTypes';

class Island {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.name = obj?.name || '';
    this.dna = obj?.dna || '0'.repeat(400);
    this.active = obj?.active || '';

    // Tiles
    this.tiles = obj?.tiles || new Array<Tile>(400);
    if (obj?.tiles) {
      this.tiles = obj?.tiles;
    } else {
      for (let i = 0; i < this.dna.length; i++) {
        this.tiles[i] = new Tile({
          kind: TileKind.DEEP_WATER,
        });
      }
    }
  }

  id: string;
  name: string;
  dna: string;
  active: boolean;

  tiles: Array<Tile>;
}

export default Island;
