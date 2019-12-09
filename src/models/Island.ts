import { Resource } from '../libs/jsonapi/client';

class Island implements Resource {
  constructor(id: string) {
    this.id = id;
    this.type = 'islands';
  }

  id: string;
  type: string = 'islands';

  getType() {
    return 'islands';
  }
}

export { Island };
