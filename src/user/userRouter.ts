export {};

const router = require('express').Router(),
    middleware = require('../middleware').middleware,
    userService = require('./userService');

router.post('/login', middleware(userService.login, false));
router.post('/', middleware(userService.create, false));
router.post('/checkToken', middleware(userService.checkToken, true));
// router.get('/:id', middleware(userService.checkToken, true));
// router.get('/', middleware(userService.getAll, true));
router.put('/:id', middleware(userService.update, true));
router.delete('/', middleware(userService.delete, true));

module.exports = router;