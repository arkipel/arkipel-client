class Tile {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.position = obj?.position || '';
    this.kind = obj?.kind || '';
    this.infrastructure = obj?.infrastructure || '';
    this.level = obj?.level || 0;
  }

  id: string;
  position: string;
  kind: string;
  infrastructure: string;
  level: number;
}

export default Tile;
