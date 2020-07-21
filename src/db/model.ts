type Type = {
  type: Type,
  isArray: boolean;
} | string | number | boolean;

class modelClass {
  allowedEntries: { key: string; type: string; default?: any }[];
  db: any;
  collectionName: string;
  isArray: boolean;
  constructor(collectionName: string, db: any, allowedEntries: { key: string; type: string; default?: any }[], isArray: boolean) {
    this.allowedEntries = allowedEntries;
    this.db = db;
    this.collectionName = collectionName;
    this.isArray = isArray;
  }

  getAll = async (where: object) => {
    let collections = await this.db.collection(this.collectionName).find(where).toArray();
    return collections;
  };

  getOne = async (where: object) => {
    let collection = await this.db.collection(this.collectionName).findOne(where);
    return collection;
  };

  create = async (body: object) => {
    let data = this.addDefaults(Array.isArray(body) && this.isArray ? body : { ...body }) as any;
    data = this.cleanObject(Array.isArray(data) && this.isArray ? data : { ...data });
    if ((Array.isArray(data) && this.isArray && !data.find((ele) => Object.keys(data).length != this.allowedEntries.length))
      || (!(Array.isArray(body) && this.isArray) &&
        Object.keys(data).length != this.allowedEntries.length)
    )
      throw "Invalid Model: " + this.collectionName;
    let newObject = await this.db.collection(this.collectionName).insertOne(data);
    return newObject.insertedId;
  };

  update = async (body: object, where: object) => {
    const data = this.cleanObject(Array.isArray(body) && this.isArray ? body : { ...body }
    );
    if (
      (Array.isArray(data) && data.length >= 1 && !!data.find((ele) => Object.keys(ele).length >= 1))
      || (!(Array.isArray(body) && this.isArray) && Object.keys(data).length >= 1))
      await this.db.collection(this.collectionName).updateOne(where, { $set: { ...data } });
  };

  delete = async (where: object) => {
    await this.db.collection(this.collectionName).deleteOne(where);
  };

  cleanObject = (object: Object | Array<any>) => {
    if ((Array.isArray(object) && this.isArray)) {
      object = object.map(ele => {
        let keys = Object.keys(ele) as string[];
        keys.forEach((eleKey: string) => {
          if (this.hasKey(ele, eleKey) && !this.allowedEntries.find(eleAK => eleAK.key == eleKey && eleAK.type == typeof ele[eleKey])) {
            delete ele[eleKey];
          }
        });
        return ele;
      });
    } else {
      let keys = Object.keys(object) as string[];
      keys.forEach((ele: string) => {
        if (this.hasKey(object, ele) && !this.allowedEntries.find(eleAK => eleAK.key == ele && eleAK.type == typeof object[ele])) {
          delete object[ele];
        }
      });
    }
    return object;
  };

  addDefaults = (object: any | Array<any>) => {
    if ((Array.isArray(object) && this.isArray)) {
      object = object.map(ele => {
        this.allowedEntries.map((eleKey: any) => {
          if (ele[eleKey.key] == undefined) ele[eleKey.key] = eleKey.default;
        });
      })
    } else {
      this.allowedEntries.map((eleKey: any) => {
        if (eleKey.default != undefined && object[eleKey.key] == undefined) object[eleKey.key] = eleKey.default;
      });
    }
    return object;
  };

  //copied code learn more about
  hasKey<O>(obj: O, key: keyof any): key is keyof O {
    return key in obj;
  }
}

const doesTypeMatch = (value: any, type: any) => {
  if (typeof type == typeof value) return true;
  if (typeof type == "object") {
    if (type.isArray != Array.isArray(value)) return false;
    Object.keys(type)
  }
}

module.exports = modelClass;
