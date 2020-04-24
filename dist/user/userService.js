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
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../db/models').user;
const activistModel = require('../db/models').activist;
let objectToExport = {};
objectToExport.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        throw "Improper Input";
    let userData = yield userModel.getOne({ email: email });
    if (!userData)
        throw "Authentication Failed";
    if (!(yield bcrypt.compare(password, userData.password)))
        throw "Authentication Failed";
    const token = yield jwt.sign({ email: email, id: userData._id, pageID: userData.pageID }, process.env.WEBTOKENSECRET);
    res.json({ token: token });
});
objectToExport.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phoneNumber, type, isPublic, location, interests, desc } = req.body;
    if (!emailCheck(email) || !password || !type || !isPublic || !location || !name || !interests || !desc)
        throw "Improper Input";
    if (phoneNumber && !checkPhoneNumber(phoneNumber))
        throw "Invalid phone number format.";
    let checkUser = yield userModel.getOne({ email: email });
    if (checkUser)
        throw "Email already in use.";
    req.body.password = yield bcrypt.hash(password, 12);
    yield userModel.create(req.body);
    res.json({ message: "Created User!" });
});
objectToExport.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phoneNumber, type, isPublic, location, interests, desc } = req.body;
    if ((email != undefined && !emailCheck(email)) || (!password && !phoneNumber && !type && !isPublic && !location && !name && !interests && !desc))
        throw "Improper Input";
    yield userModel.update(req.body);
    res.json({ message: "Updated User!" });
});
objectToExport.checkToken = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ user: {
            email: user.email,
            id: user.id,
            pageID: user.pageID
        } });
});
objectToExport.delete = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    let userToDelete = yield userModel.getOne({ email: user.email });
    yield activistModel.delete({ _id: userToDelete.pageID });
    yield userModel.delete({ email: user.email });
    res.json({ message: "Deleted User" });
});
const emailCheck = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
const checkPhoneNumber = (phoneNumber) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(phoneNumber).toLowerCase());
};
module.exports = objectToExport;
