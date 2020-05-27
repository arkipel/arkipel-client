class Island {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.name = obj?.name || '';
    this.dna = obj?.dna || '';
    this.active = obj?.active || '';
  }

  id: string;
  name: string;
  dna: string;
  active: boolean;
}

export default Island;
