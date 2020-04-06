export {};

const router = require('express').Router(),
    middleware = require('../middleware').middleware,
    organizationService = require('./organizationService');

router.post('/', middleware(organizationService.create, false));

router.put('/request/:id', middleware(organizationService.requestUpdate, false));
router.put('/:id', middleware(organizationService.update, true));

router.get('/request', middleware(organizationService.getAllUpdateRequests, true));
router.get('/', middleware(organizationService.getAll, false));
router.get('/:id', middleware(organizationService.getUpdateRequest, true));

module.exports = router;