'use-strict'
import express from 'express';
const userModel = require('./models').user;
const jwt = require('jsonwebtoken');

exports.middleware = function (callback: Function, authorize: boolean) {
    async function middleware(req: express.Request, res: express.Response) {
        try {
            if (authorize) {
                if (req.headers.authorization == undefined) throw "Authentication Failed"
                let decoded = null;
                try {
                    decoded = await jwt.verify(req.headers.authorization, process.env.WEBTOKENSECRET);
                    if (decoded.TeamMember != undefined) decoded.teamMember = decoded.TeamMember
                } catch (err) { throw "Authentication Failed" }
                await callback(req, res, decoded)
            } else {
                await callback(req, res);
            }
        } catch (err) {
            console.log("Caught Error: ")
            console.log(err)
            if (typeof err == "string") {
                res.json({ error: err })
                return;
            }
            res.json({ error: "Error" })
        }

    }
    return middleware;
}