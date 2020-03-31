class Query {
  constructor(type: string) {
    this.type = type;
    // this.fields = [];
    // this.filter = null;
    // this.sort = [];
    // this.pageSize = 0;
    // this.pageNumber = 0;
    // this.include = [];
  }

  type: string;
  fields?: string[];
  filter?: any;
  sort?: string[];
  pageSize?: number;
  pageNumber?: number;
  include?: string[];
}

export { Query };
