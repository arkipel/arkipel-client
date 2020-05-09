import { Tile } from './Tile';

class Island {
  readonly type = 'islands';
  id = '';

  // Attributes
  name = '';

  // Relationships
  tiles = new Array<Tile>();
}

export { Island };
