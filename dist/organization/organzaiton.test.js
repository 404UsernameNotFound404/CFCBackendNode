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
const initDB = require("../db/db").initDB;
const request = require("supertest");
const { app } = require("../app");
describe("Organization", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () { }));
    it("should return an array of orgs", (done) => __awaiter(void 0, void 0, void 0, function* () {
        yield initDB();
        const res = yield request(app)
            .get("/organization/")
            .set("Accept", "application/json")
            .expect(200)
            .expect("Content-Type", /json/);
        console.log(res.body);
        expect(true).toEqual(true);
        done();
    }));
});
/*

*/
