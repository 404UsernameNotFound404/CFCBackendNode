class modelClass {
    validKeys: { key: string, type: string }[];
    getDB: any;
    collectionName: string;
    constructor(collectionName: string, getDB: any, validKeys: { key: string, type: string }[]) {
        this.validKeys = validKeys;
        this.getDB = getDB;
        this.collectionName = collectionName;
    }

    getAll = async (where: object) => {
        const db = this.getDB();
        let collections = await db.collection(this.collectionName).find(where).toArray();
        return collections;
    }

    getOne = async (where: object) => {
        const db = this.getDB();
        let collection = await db.collection(this.collectionName).findOne(where)
        return collection;
    }

    create = async (body: object) => {
        const db = this.getDB();
        const data = this.cleanObject((Array.isArray(body) ? body : { ...body }));
        if ((Array.isArray(data) && !data.find(ele => Object.keys(data).length != this.validKeys.length)) || (!Array.isArray(body) && Object.keys(data).length != this.validKeys.length)) throw "Invalid Model"
        let newObject = await db.collection(this.collectionName).insertOne({ data: data });
        return newObject.insertedId;
    }

    update = async (body: object, where: object) => {
        const db = this.getDB();
        const data = this.cleanObject((Array.isArray(body) ? body : { ...body }));
        if ((Array.isArray(data) && data.length >= 1 && !!data.find(ele => Object.keys(ele).length >= 1)) || (!Array.isArray(body) && Object.keys(data).length >= 1)) await db.collection(this.collectionName).updateOne(where, { $set: {data: data} });
    }

    delete = async (where: object) => {
        const db = this.getDB();
        await db.collection(this.collectionName).deleteOne(where);
    }

    cleanObject = (object: Object | Array<any>) => {
        if (Array.isArray(object)) {
            object = object.map(ele => {
                let keys = Object.keys(ele) as string[];
                keys.forEach((eleKey: string) => {
                    if (this.hasKey(ele, eleKey) && !this.validKeys.find(eleAK => eleAK.key == eleKey && eleAK.type == typeof ele[eleKey])) delete ele[eleKey];
                });
                return ele;
            });
        } else {
            let keys = Object.keys(object) as string[];
            keys.forEach((ele: string) => {
                if (this.hasKey(object, ele) && !this.validKeys.find(eleAK => eleAK.key == ele && eleAK.type == typeof object[ele])) delete object[ele];
            });
        }
        return object;
    }

    //copied code learn more about
    hasKey<O>(obj: O, key: keyof any): key is keyof O {
        return key in obj
    }
}

module.exports = modelClass;