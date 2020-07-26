class Tile {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.position = obj?.position || 0;
    this.kind = kindToWord(dna[this.position] || '0');
    this.infrastructure = obj?.infrastructure || '';
    this.level = obj?.level || 0;
  }

  id: string;
  position: number;
  kind: string;
  infrastructure: string;
  level: number;
}

export default Tile;

const kindToWord = (k: string): string => {
  switch (k) {
    case '1':
      return 'water';
    case '2':
      return 'beach';
    case '3':
      return 'land';
    default:
      return 'deep_water';
  }
};

const dna =
  '0000000000000000' +
  '0000011111100000' +
  '0001112222111000' +
  '0011222332221100' +
  '0012233333322100' +
  '0112333333332110' +
  '0122333333332210' +
  '0123333333333210' +
  '0123333333333210' +
  '0122333333332210' +
  '0112333333332110' +
  '0012233333322100' +
  '0011222332221100' +
  '0001112222111000' +
  '0000011111100000' +
  '0000000000000000';
