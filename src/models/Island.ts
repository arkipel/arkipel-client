import User from '../models/User';
import Tile from '../models/Tile';

class Island {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.name = obj?.name || '';
    this.owner = obj?.owner || new User({});

    let tiles = obj?.tiles || [];
    this.tiles = new Array<Tile>();
    for (const t of tiles) {
      this.tiles.push(new Tile(t));
    }
  }

  id: string;
  name: string;
  owner: User;
  tiles: Array<Tile>;
}

export default Island;
