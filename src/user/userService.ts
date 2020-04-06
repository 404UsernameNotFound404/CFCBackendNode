import express from 'express';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models').user;
const activistModel = require('../models').activist;

let objectToExport = {} as any;

objectToExport.login = async (req: express.Request, res: express.Response) => {
    const {email, password} = req.body;
    if (!email || !password) throw "Improper Input"
    let userData = await userModel.getOne({email: email});
    if (!userData) throw "Authentication Failed";
    if (!(await bcrypt.compare(password, userData.password))) throw "Authentication Failed";
    const token = await jwt.sign({email: email, id: userData._id, pageID: userData.pageID}, process.env.WEBTOKENSECRET);
    res.json({token: token})
}

objectToExport.create = async (req: express.Request, res: express.Response) => {
    const {name, email, password, phoneNumber, type, isPublic, location, interests, desc} = req.body;
    if (!emailCheck(email) || !password || !type || !isPublic || !location || !name || !interests || !desc) throw "Improper Input";
    if (phoneNumber && !checkPhoneNumber(phoneNumber)) throw "Invalid phone number format."

    let checkUser = await userModel.getOne({email: email});
    if (checkUser) throw "Email already in use.";

    req.body.password = await bcrypt.hash(password, 12);
    await userModel.create(req.body);
    res.json({message: "Created User!"})
}

objectToExport.update = async (req: express.Request, res: express.Response) => { 
    const {name, email, password, phoneNumber, type, isPublic, location, interests, desc} = req.body;
    if ((email != undefined && !emailCheck(email)) || (!password && !phoneNumber && !type && !isPublic && !location && !name && !interests && !desc)) throw "Improper Input";
    await userModel.update(req.body);
    res.json({message: "Updated User!"})
}

objectToExport.checkToken = async (req: express.Request, res: express.Response, user: {email: string, id: string, pageID: object}) => {
    res.json({user: {
        email: user.email,
        id: user.id,
        pageID: user.pageID
    }});
}

objectToExport.delete = async (req: express.Request, res: express.Response, user: {email: string, id: string, pageID: object}) => {
    let userToDelete = await userModel.getOne({email: user.email});
    await activistModel.delete({_id: userToDelete.pageID})
    await userModel.delete({email: user.email})
    res.json({message: "Deleted User"})
}

const emailCheck = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()); 
}

const checkPhoneNumber = (phoneNumber: string) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    return re.test(String(phoneNumber).toLowerCase()); 
}

module.exports = objectToExport;