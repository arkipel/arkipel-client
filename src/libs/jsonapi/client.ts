class Client {
  constructor(base: string) {
    this.base = base;
  }

  base: string;

  async getOne<T extends Resource>(id: string): Promise<T> {
    // let typeName = ;
    let typeName = 'islands';
    console.log('Type name:', typeName);

    let url = `${this.base}/${typeName}/${id}`;

    let res = await fetch(url);
    let body = await res.json();

    return body.data;
  }

  async getMany<T extends Resource>(): Promise<Array<T>> {
    // let typeName = ;
    let typeName = 'islands';
    console.log('Type name:', typeName);

    let url = `${this.base}/${typeName}`;

    let res = await fetch(url);
    let body = await res.json();

    let collection = new Array<T>();

    for (let i in body.data) {
      let elem = body.data[i];
      console.log('element:', elem);
      collection.push(elem);
    }

    return collection;
  }
}

interface Resource {
  readonly type: string;
  id: string;

  getType: () => string;
}

export { Client, Resource };
