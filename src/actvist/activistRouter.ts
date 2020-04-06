export {};

let router = require('express').Router(),
    middleware = require('../middleware').middleware,
    activistService = require('./activistService');

router.post('/', middleware(activistService.update, true));
router.get('/:id', middleware(activistService.get, true));

module.exports = router;