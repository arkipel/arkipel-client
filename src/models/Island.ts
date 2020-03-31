import { Resource } from '../libs/jsonapi/resource';

import { Tile } from './Tile';

class Island implements Resource {
  readonly type = 'islands';
  id = '';

  // Attributes
  name = '';

  // Relationships
  tiles = new Array<Tile>();
}

export { Island };
