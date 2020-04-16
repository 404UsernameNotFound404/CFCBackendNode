export { };

const router = require('express').Router(),
    middleware = require('../middleware').middleware,
    pageService = require('./pageService');

router.post('/', middleware(pageService.update, true));
router.get('/:id', middleware(pageService.get, true));

module.exports = router;