import User from '../models/User';
import Tile from '../models/Tile';

import { TileKind } from '../generated/globalTypes';

class Island {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.owner = obj?.owner || new User({});

    // Tiles
    this.tiles = obj?.tiles || new Array<Tile>(256);
    if (obj?.tiles) {
      this.tiles = obj?.tiles;
    } else {
      for (let i = 0; i < 256; i++) {
        this.tiles[i] = new Tile({
          kind: TileKind.DEEP_WATER,
        });
      }
    }
  }

  id: string;
  owner: User;
  tiles: Array<Tile>;
}

export default Island;
