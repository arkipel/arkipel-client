import { Island } from './Island';

class Tile {
  constructor(id: string, x: number, y: number) {
    this.id = id;

    this.x = x;
    this.y = y;

    this.island = new Array<Island>();
  }

  readonly id: string;
  readonly type: string = 'tiles';

  // Attributes
  x: number;
  y: number;

  // Relationships
  island: Array<Island>;
}

export { Tile };
