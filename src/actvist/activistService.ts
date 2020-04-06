import express from 'express';
import { ObjectID } from 'mongodb';
const userModel = require('../models').user;
const activistsModel = require('../models').activist;

let objectToExport = {} as any;

objectToExport.update = async (req: express.Request, res: express.Response, user: { email: string, id: string }) => {
    if (!req.body.data && !Array.isArray(req.body.data)) throw "Improper Input";
    let userData = await userModel.getOne({ email: user.email });
    //Checking if user has page already
    if (userData.pageID.length <= 1) {
        let activistsId = await activistsModel.create(req.body.data);
        await userModel.update({ pageID: activistsId }, { email: user.email });
        res.json({ message: "Created Page!" })
    } else {
        await activistsModel.update(req.body.data, { _id: userData.pageID });
        res.json({ message: "Updated Page!" })
    }
}

objectToExport.getAll = async (req: express.Request, res: express.Response, user: { email: string, id: string }) => { 
    // let userActivists = await userModel.getAll({is});
}

objectToExport.get = async (req: express.Request, res: express.Response, user: { email: string, id: string }) => {
    if (!req.params.id) throw "Must dictate which page to access";
    let activistPage = await activistsModel.getOne({ _id: new ObjectID(req.params.id) });
    let userData = await userModel.getOne({ pageID: new ObjectID(req.params.id) });
    res.json({
        isOwner: (userData.pageID == req.params.id),
        user: { name: userData.name, email: userData.email, phoneNumber: userData.phoneNumber, image: userData.image, location: userData.location }, 
        activist: activistPage
    });
}

module.exports = objectToExport;