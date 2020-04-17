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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const userModel = require('../models').user;
const activistsModel = require('../models').activist;
let objectToExport = {};
objectToExport.update = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.data && !Array.isArray(req.body.data))
        throw "Improper Input";
    let userData = yield userModel.getOne({ email: user.email });
    //Checking if user has page already
    if (userData.pageID.length <= 1) {
        let activistsId = yield activistsModel.create(req.body.data);
        yield userModel.update({ pageID: activistsId }, { email: user.email });
        res.json({ message: "Created Page!" });
    }
    else {
        yield activistsModel.update(req.body.data, { _id: userData.pageID });
        res.json({ message: "Updated Page!" });
    }
});
objectToExport.getAll = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    // let userActivists = await userModel.getAll({is});
});
objectToExport.get = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw "Must dictate which page to access";
    let activistPage = yield activistsModel.getOne({ _id: new mongodb_1.ObjectID(req.params.id) });
    let userData = yield userModel.getOne({ pageID: new mongodb_1.ObjectID(req.params.id) });
    res.json({
        isOwner: (userData.pageID == req.params.id),
        user: { name: userData.name, email: userData.email, phoneNumber: userData.phoneNumber, image: userData.image, location: userData.location },
        activist: activistPage
    });
});
module.exports = objectToExport;
