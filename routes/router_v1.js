const router = require('express').Router();

router.use('/', require('./v1/users'));
router.use('/', require('./v1/products'));
router.use('/', require('./v1/communities'));

module.exports = router;