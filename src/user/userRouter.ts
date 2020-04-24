export {};

const router = require('express').Router(),
    middleware = require('../middleware').middleware,
    userService = require('./userService');

router.post('/login', middleware(userService.login, false)); //done 
router.post('/', middleware(userService.create, false)); //register //done
router.post('/checkToken', middleware(userService.checkToken, true)); //done

router.post('/forgotPassword/send', middleware(userService.forgotPasswordSend, true)) //TODO
router.post('/forgotPassword/verify', middleware(userService.forgotPasswordVerify, true)) //TODO
router.post("/verifyEmail", middleware(userService.verifyEmail, true)) //TODO

router.post('/photo', middleware(userService.setProfilePhoto, true)) //can delete as well
router.put('/:id', middleware(userService.update, true));
router.delete('/', middleware(userService.delete, true));

module.exports = router;