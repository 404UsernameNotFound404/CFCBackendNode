"use strict";
'use-strict';
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
const userModel = require('./db/models').user;
const jwt = require('jsonwebtoken');
exports.middleware = function (callback, authorize) {
    function middleware(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (authorize) {
                    if (req.headers.authorization == undefined)
                        throw "Authentication Failed";
                    let decoded = null;
                    try {
                        console.log(req.headers.authorization);
                        decoded = yield jwt.verify(req.headers.authorization, process.env.WEBTOKENSECRET);
                        if (decoded.TeamMember != undefined)
                            decoded.teamMember = decoded.TeamMember;
                    }
                    catch (err) {
                        throw "Authentication Failed";
                    }
                    yield callback(req, res, decoded);
                }
                else {
                    yield callback(req, res);
                }
            }
            catch (err) {
                console.log("Caught Error: ");
                console.log(err);
                if (typeof err == "string") {
                    res.json({ error: err });
                    return;
                }
                res.json({ error: "Error" });
            }
        });
    }
    return middleware;
};
