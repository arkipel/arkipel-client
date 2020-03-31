import { Resource } from './resource';

class Schema {
  types = new Map<string, any>();

  hasType = (name: string): boolean => {
    return this.types.has(name);
  };

  //   getType = <T extends Resource>(name: string): Type<T> => {
  //     return this.types.get(name) as Type<T>;
  //   };

  addType = <T extends Resource>(sample: T): void => {
    this.types.set(sample.type, new Type(sample));
  };
}

class Type<T extends Resource> {
  constructor(obj: T) {
    this.name = obj.type;
    this.sample = obj;

    // TODO Get attributes and relationships
  }

  name = '';
  attributes = new Array<Attribute>();
  relationships = new Array<Relationship>();
  sample: T;
}

class Attribute {
  constructor(name: string, type: t, nullable: boolean) {
    this.name = name;
    this.type = type;
    this.nullable = nullable;
  }

  name: string;
  type: t;
  nullable: boolean;

  cast = (v: any): string | number | boolean | Date => {
    switch (this.type) {
      case 'string':
        return v as string;

      case 'integer':
        return v as number;

      case 'boolean':
        return v as boolean;

      case 'time':
        return new Date(v);
    }
  };
}

type t = 'string' | 'integer' | 'boolean' | 'time';

class Relationship {}

export { Schema, Type, Attribute, Relationship };
