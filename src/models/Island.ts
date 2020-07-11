import Tile from '../models/Tile';

class Island {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.name = obj?.name || '';
    this.dna = obj?.dna || '';
    this.active = obj?.active || '';

    this.tiles = obj?.tiles || new Array<Tile>(400);
  }

  id: string;
  name: string;
  dna: string;
  active: boolean;

  tiles: Array<Tile>;
}

export default Island;
