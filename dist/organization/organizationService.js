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
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models').user;
const organizationModel = require('../models').organization;
const organizationChangeReqModel = require('../models').orgChangeRequest;
let objectToExport = {};
objectToExport.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { name, location, email, desc, link, interests } = req.body;
    console.log(!name);
    console.log(!location);
    console.log(!email);
    console.log(!desc);
    console.log(!link);
    console.log(!interests);
    if (!name || !location || !email || !desc || !link || !interests)
        throw "Invalid Input.";
    yield organizationModel.create(Object.assign(Object.assign({}, req.body), { pageID: "play" }));
    res.json({ message: "Created User!" });
});
objectToExport.requestUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw "Must specify which organization to update";
    let orgToUpdate = yield organizationModel.getOne({ _id: new mongodb_1.ObjectID(req.params.id) });
    if (!orgToUpdate)
        throw "Can't find organization to update";
    const { name, location, email, desc, link, interests, deleteReq } = req.body;
    if (!name || !location || !email || !desc || !link || !interests || deleteReq == undefined)
        throw "Invalid Input.";
    yield organizationChangeReqModel.create(Object.assign(Object.assign({}, req.body), { orgID: new mongodb_1.ObjectID(req.params.id) }));
    res.json({ message: "Requested Organization Update!" });
});
objectToExport.update = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!user.teamMember)
        throw "Must be team member to authorize updates.";
    if (id == undefined)
        throw "Must specify which organization request to act on";
    const { approve } = req.body;
    if (approve == undefined)
        throw "Must specify if choice on request.";
    const orgRequestUpdateObjectID = new mongodb_1.ObjectID(id);
    let updateReq = yield organizationChangeReqModel.getOne({ _id: orgRequestUpdateObjectID });
    if (!updateReq)
        throw "Can't find update request";
    if (approve && updateReq.data.deleteReq)
        yield organizationModel.delete({ _id: new mongodb_1.ObjectID(updateReq.data.orgID) });
    if (approve && !updateReq.data.deleteReq)
        yield organizationModel.update({ name: updateReq.data.name, location: updateReq.data.location, email: updateReq.data.email, desc: updateReq.data.desc, link: updateReq.data.link, interests: updateReq.data.interests }, { _id: new mongodb_1.ObjectID(updateReq.data.orgID) });
    yield organizationChangeReqModel.delete({ _id: orgRequestUpdateObjectID });
    res.json({ message: "Updated Organization!" });
});
objectToExport.getAllUpdateRequests = (req, res, userBasicInfo) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userBasicInfo.teamMember)
        throw "Must be a team member to view update requests.";
    let requests = yield organizationChangeReqModel.getAll();
    res.json(requests);
});
objectToExport.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let organizations = yield organizationModel.getAll();
    res.json(organizations);
});
objectToExport.getUpdateRequest = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!user.teamMember)
        throw "Must be team member to authorize updates.";
    if (!id)
        throw "must give id";
    let request = yield organizationModel.getOne({ _id: new mongodb_1.ObjectID(id) });
    if (!request)
        throw "Can't find id";
    res.json(request);
});
module.exports = objectToExport;
