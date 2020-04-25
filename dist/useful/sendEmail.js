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
const nodemailer = require('nodemailer');
const myEmail = 'admin@connecting-for-change.ca';
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: "587",
    auth: {
        user: myEmail,
        pass: 'DaxtonIsPoopyPantsJKHe420AllDay'
    }
});
const sendEmail = (to, subject, body, html) => __awaiter(void 0, void 0, void 0, function* () {
    yield transporter.sendMail({ from: myEmail, to: to, subject: subject, text: body }, function (error, info) {
        if (error)
            throw "Failed to send email.";
    });
});
module.exports = sendEmail;
