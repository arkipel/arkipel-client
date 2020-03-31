import { Schema } from './schema';
import { Query } from './query';
import { Resource, flatten } from './resource';

class Client {
  constructor(base: string) {
    this.base = base;
  }

  base: string;
  schema = new Schema();

  async getOne<T extends Resource>(
    type: string,
    id: string,
  ): Promise<T | null> {
    if (!this.schema.hasType(type)) {
      return null;
    }

    let url = `${this.base}/${type}/${id}`;

    let resp = await fetch(url);
    let body = await resp.json();

    let res = flatten<T>(body.data);

    return res;
  }

  async getMany<T extends Resource>(query: Query): Promise<Array<T>> {
    let url = `${this.base}/${query.type}`;

    let resp = await fetch(url);
    let body = await resp.json();

    let collection = new Array<T>();

    for (let i in body.data) {
      collection.push(flatten<T>(body.data[i]));
    }

    return collection;
  }
}

export { Client };
