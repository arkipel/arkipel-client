class Currency {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.code = obj?.code || '';
    this.name = obj?.name || '';
  }

  id: string;
  code: string;
  name: string;

  codeStr(): string {
    return this.code.toUpperCase();
  }
}

export default Currency;
