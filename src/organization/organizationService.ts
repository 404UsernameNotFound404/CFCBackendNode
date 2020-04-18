import express from 'express';
import { ObjectID } from 'mongodb';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models').user;
const organizationModel = require('../models').organization;
const organizationChangeReqModel = require('../models').orgChangeRequest;

let objectToExport = {} as any;

objectToExport.create = async (req: express.Request, res: express.Response) => {
    console.log(req.body)
    const { name, location, email, desc, link, interests} = req.body;
    console.log(!name)
    console.log(!location)
    console.log(!email)
    console.log(!desc)
    console.log(!link)
    console.log(!interests)
    if (!name || !location || !email || !desc || !link || !interests) throw "Invalid Input."
    await organizationModel.create({...req.body, pageID: "play"});
    res.json({ message: "Created User!" });
}

objectToExport.requestUpdate = async (req: express.Request, res: express.Response) => {
    if (!req.params.id) throw "Must specify which organization to update";
    let orgToUpdate = await organizationModel.getOne({_id: new ObjectID(req.params.id)})
    if (!orgToUpdate) throw "Can't find organization to update";
    const { name, location, email, desc, link, interests, deleteReq } = req.body;
    if (!name || !location || !email || !desc || !link || !interests || deleteReq == undefined) throw "Invalid Input."
    await organizationChangeReqModel.create({ ...req.body, orgID: new ObjectID(req.params.id) });
    res.json({ message: "Requested Organization Update!" })
}

objectToExport.update = async (req: express.Request, res: express.Response, user: { email: string, id: string, pageID: object, teamMember: boolean }) => { 
    const { id } = req.params;
    if (!user.teamMember) throw "Must be team member to authorize updates."
    if (id == undefined) throw "Must specify which organization request to act on";
    const { approve } = req.body;
    if (approve == undefined) throw "Must specify if choice on request."
    const orgRequestUpdateObjectID = new ObjectID(id)
    let updateReq = await organizationChangeReqModel.getOne({ _id: orgRequestUpdateObjectID })
    if (!updateReq) throw "Can't find update request";
    if (approve && updateReq.data.deleteReq) await organizationModel.delete({_id: new ObjectID(updateReq.data.orgID)});
    if (approve && !updateReq.data.deleteReq) await organizationModel.update({name: updateReq.data.name, location: updateReq.data.location, email: updateReq.data.email, desc: updateReq.data.desc, link: updateReq.data.link, interests: updateReq.data.interests}, {_id: new ObjectID(updateReq.data.orgID)})
    await organizationChangeReqModel.delete({ _id: orgRequestUpdateObjectID })
    res.json({ message: "Updated Organization!" });
}

objectToExport.getAllUpdateRequests = async (req: express.Request, res: express.Response, userBasicInfo: { email: string, id: string, pageID: object, teamMember: boolean }) => { 
    if (!userBasicInfo.teamMember) throw "Must be a team member to view update requests."
    let requests = await organizationChangeReqModel.getAll();
    res.json(requests)
}

objectToExport.getAll = async (req: express.Request, res: express.Response) => {
    let organizations = await organizationModel.getAll();
    res.json(organizations);
}

objectToExport.getUpdateRequest = async (req: express.Request, res: express.Response, user: { email: string, id: string, pageID: object, teamMember: boolean }) => { 
    const { id } = req.params;
    if (!user.teamMember) throw "Must be team member to authorize updates."
    if (!id) throw "must give id";
    let request = await organizationModel.getOne({_id: new ObjectID(id)});
    if (!request) throw "Can't find id";
    res.json(request)
}
module.exports = objectToExport;