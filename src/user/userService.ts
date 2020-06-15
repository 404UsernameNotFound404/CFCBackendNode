import express from 'express';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userModel = require('../db/models').user;
const activistModel = require('../db/models').activist;
const verificationCodeModel = require('../db/models').userVerificationCode;
const forgotPasswordModel = require('./forgotPasswordModel');

const sendMail = require('../useful/sendEmail');
const createVerificationCode = require('../useful/verificationCodeCreation');

const uploadPhoto = require('../useful/uploadPhoto');


let objectToExport = {} as any;

objectToExport.login = async (req: express.Request, res: express.Response) => {
    const {email, password} = req.body;
    console.log(req.body);
    console.log(!email)
    console.log(!password)
    if (!email || !password) throw "Improper Input"
    let userData = await userModel.getOne({email: email});
    console.log(userData)
    if (!userData) throw "Can't find email.";
    console.log(userData);
    if (!userData.verified) throw "Email not verified. Please check your email.";
    console.log(await bcrypt.hash(password, 12));
    console.log(userData.password)
    await bcrypt.compare(password.trim(), userData.password.trim()).then((res: boolean) => {
        if (!res) throw "Authentication Failed"
    })
    const token = await jwt.sign({email: email, id: userData._id, pageID: userData.pageID}, process.env.WEBTOKENSECRET);
    res.json({token: token})
}

objectToExport.create = async (req: express.Request, res: express.Response) => {
    const {name, email, password, phoneNumber, isPublic} = req.body;
    if (!emailCheck(email) || !password || !isPublic || !name) throw "Improper Input";
    if (phoneNumber && !checkPhoneNumber(phoneNumber)) throw "Invalid phone number format."

    let checkUser = await userModel.getOne({email: email});
    if (checkUser) throw "Email already in use.";

    req.body.password = await bcrypt.hash(password, 12);
    let userID = await userModel.create(req.body);

    const verificationCode = createVerificationCode(10);
    await verificationCodeModel.create({key: verificationCode, userID: userID})

    await sendMail(email,  "Connecting For Change Verification Code", "Welcome to Connecting For Change. Please Go to this link to verify you email.\n"+"https://connecting-for-change.ca/verify?auth="+verificationCode, "asdasd")
    res.json({message: "Created User!"})
}

objectToExport.update = async (req: express.Request, res: express.Response) => { 
    const {name, email, password, phoneNumber, isPublic, location, interests} = req.body;
    if ((email != undefined && !emailCheck(email)) || (!password && !phoneNumber && !isPublic && !location && !name && !interests)) throw "Improper Input";
    await userModel.update(req.body);
    res.json({message: "Updated User!"})
}

objectToExport.checkToken = async (req: express.Request, res: express.Response, user: {email: string, id: string, pageID: object}) => {
    res.json({user: { email: user.email, id: user.id, pageID: user.pageID }});
}

objectToExport.delete = async (req: express.Request, res: express.Response, user: {email: string, id: string, pageID: object}) => {
    let userToDelete = await userModel.getOne({email: user.email});
    await activistModel.delete({_id: userToDelete.pageID})
    await userModel.delete({email: user.email})
    res.json({message: "Deleted User"})
}

objectToExport.verifyEmail = async (req: express.Request, res: express.Response) => {
    const { verificationCode } = req.body;
    if (!verificationCode) throw "Must Provide Code"
    let verificationCodeObj = await verificationCodeModel.getOne({key: verificationCode});
    if (!verificationCodeObj) throw "Invalid Code";
    await userModel.update({verified: true}, {_id: verificationCodeObj.userID});
    await verificationCodeModel.delete({_id: verificationCodeObj._id});
    res.json({message: "Verified Email"});
}

objectToExport.forgotPasswordSend = async (req: express.Request, res: express.Response) => {
    const { email } = req.body;
    if (!email) throw "Must provide email."
    if (await userModel.getOne({email: email}) == null) throw "No account associated with email."

    const verificationCode = createVerificationCode(10);
    await forgotPasswordModel.delete({userEmail: email});
    await forgotPasswordModel.create({key: verificationCode, userEmail: email});
    await sendMail(email,  "Connecting For Change Forgot Password", "Please Go to this link to reset your password.\n"+"https://connecting-for-change.ca/forgotPassword?auth="+verificationCode, "asdasd")
    res.json({message: "Reset Email Sent!"})
}

objectToExport.forgotPasswordVerify = async (req: express.Request, res: express.Response) => {
    const { verificationCode, newPassword } = req.body;
    if (!verificationCode && !newPassword) throw "Must provide verification code and password."

    const verifyDoc = await forgotPasswordModel.getOne({key: verificationCode});
    if (!verifyDoc) throw "Invalid code."

    await Promise.all([
        userModel.update({password: await bcrypt.hash(newPassword, 12)}, {email: verifyDoc.userEmail}),
        forgotPasswordModel.delete({key: verificationCode})
    ]);
    res.json({message: "Password reset."});
}

objectToExport.setProfilePhoto = async (req: express.Request, res: express.Response, user: {email: string, id: string, pageID: object}) => {
    await uploadPhoto();
    res.json({message: "Done"});
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