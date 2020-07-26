class Tile {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.position = obj?.position || 0;
    this.infrastructure = obj?.infrastructure || '';
    this.level = obj?.level || 0;
  }

  id: string;
  position: number;
  infrastructure: string;
  level: number;
}

export default Tile;
