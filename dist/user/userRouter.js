"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router(), middleware = require('../middleware').middleware, userService = require('./userService');
router.post('/login', middleware(userService.login, false));
router.post('/', middleware(userService.create, false)); //register
router.post('/checkToken', middleware(userService.checkToken, true));
router.post('/forgotPassword/send', middleware(userService.forgotPasswordSend, false));
router.post('/forgotPassword/verify', middleware(userService.forgotPasswordVerify, false));
router.post("/verifyEmail", middleware(userService.verifyEmail, false));
router.post('/photo/getUploadUrl', middleware(userService.setProfilePhoto, true)); //can delete as well with bool //TODO
router.post('/photo/completeUpload', middleware(userService.setProfilePhoto, true)); //TODO
router.put('/:id', middleware(userService.update, true));
router.delete('/', middleware(userService.delete, true));
module.exports = router;
