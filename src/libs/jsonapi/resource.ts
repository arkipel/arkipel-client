interface Resource {
  type: string;
  id: string;
}

let flatten = <T>(raw: any & Resource): T => {
  let res: any = {
    type: raw.type,
    id: raw.id,
  };

  // Attributes
  for (const k in raw.attributes) {
    res[k] = raw.attributes[k];
  }

  // Relationships
  for (const k in raw.relationships) {
    res[k] = raw.relationships[k];
  }

  return res;
};

export { Resource, flatten };
