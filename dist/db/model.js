"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class modelClass {
    constructor(collectionName, getDB, validKeys, isArray) {
        this.getAll = (where) => __awaiter(this, void 0, void 0, function* () {
            const db = this.getDB();
            let collections = yield db.collection(this.collectionName).find(where).toArray();
            return collections;
        });
        this.getOne = (where) => __awaiter(this, void 0, void 0, function* () {
            const db = this.getDB();
            let collection = yield db.collection(this.collectionName).findOne(where);
            return collection;
        });
        this.create = (body) => __awaiter(this, void 0, void 0, function* () {
            const db = this.getDB();
            let data = this.addDefaults((Array.isArray(body) && this.isArray) ? body : Object.assign({}, body));
            data = this.cleanObject(((Array.isArray(data) && this.isArray) ? data : Object.assign({}, data)));
            if (((Array.isArray(data) && this.isArray) && !data.find(ele => Object.keys(data).length != this.validKeys.length)) || (!(Array.isArray(body) && this.isArray) && Object.keys(data).length != this.validKeys.length))
                throw "Invalid Model: " + this.collectionName;
            let newObject = yield db.collection(this.collectionName).insertOne(data);
            return newObject.insertedId;
        });
        this.update = (body, where) => __awaiter(this, void 0, void 0, function* () {
            const db = this.getDB();
            const data = this.cleanObject(((Array.isArray(body) && this.isArray) ? body : Object.assign({}, body)));
            if ((Array.isArray(data) && data.length >= 1 && !!data.find(ele => Object.keys(ele).length >= 1)) || (!(Array.isArray(body) && this.isArray) && Object.keys(data).length >= 1))
                yield db.collection(this.collectionName).updateOne(where, { $set: Object.assign({}, data) });
        });
        this.delete = (where) => __awaiter(this, void 0, void 0, function* () {
            const db = this.getDB();
            yield db.collection(this.collectionName).deleteOne(where);
        });
        this.cleanObject = (object) => {
            if ((Array.isArray(object) && this.isArray)) {
                object = object.map(ele => {
                    let keys = Object.keys(ele);
                    keys.forEach((eleKey) => {
                        if (this.hasKey(ele, eleKey) && !this.validKeys.find(eleAK => eleAK.key == eleKey && eleAK.type == typeof ele[eleKey])) {
                            delete ele[eleKey];
                        }
                    });
                    return ele;
                });
            }
            else {
                let keys = Object.keys(object);
                keys.forEach((ele) => {
                    if (this.hasKey(object, ele) && !this.validKeys.find(eleAK => eleAK.key == ele && eleAK.type == typeof object[ele])) {
                        delete object[ele];
                    }
                });
            }
            return object;
        };
        this.addDefaults = (object) => {
            if ((Array.isArray(object) && this.isArray)) {
                object = object.map(ele => {
                    this.validKeys.map((eleKey) => {
                        if (ele[eleKey.key] == undefined)
                            ele[eleKey.key] = eleKey.default;
                    });
                });
            }
            else {
                this.validKeys.map((eleKey) => {
                    if (eleKey.default != undefined && object[eleKey.key] == undefined)
                        object[eleKey.key] = eleKey.default;
                });
            }
            return object;
        };
        this.validKeys = validKeys;
        this.getDB = getDB;
        this.collectionName = collectionName;
        this.isArray = isArray;
    }
    //copied code learn more about
    hasKey(obj, key) {
        return key in obj;
    }
}
module.exports = modelClass;
