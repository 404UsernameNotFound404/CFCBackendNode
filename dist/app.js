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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const initDB = require("./db/db").initDB;
//@ts-ignore
global.testing = false;
exports.app = express_1.default();
exports.app.use(bodyParser.urlencoded({
    extended: true,
}));
exports.app.use(bodyParser.json());
var corsOptions = {
    exposedHeaders: [
        "Content-Type",
        "Authorization",
        "Institution-Id",
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
    ],
};
exports.app.use(cors(corsOptions));
exports.app.use("/user", require("./user/userRouter"));
exports.app.use("/page", require("./page/pageRouter"));
exports.app.use("/organization", require("./organization/organizationRouter"));
exports.app.use("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "Working" });
}));
exports.app.use("/IFuckedUp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("running I fucked up");
}));
exports.startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield initDB();
    exports.app.listen(process.env.PORT, function () {
        console.log("Server is listening on port " + process.env.PORT);
    });
});
exports.startApp();
