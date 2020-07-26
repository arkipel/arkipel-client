import User from '../models/User';
import Tile from '../models/Tile';

class Island {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.owner = obj?.owner || new User({});
    this.tiles = obj?.tiles || new Array<Tile>(256);
  }

  id: string;
  owner: User;
  tiles: Array<Tile>;
}

export default Island;
