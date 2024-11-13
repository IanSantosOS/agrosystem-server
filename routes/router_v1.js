const router = require('express').Router();

router.use('/users', require('./v1/users'));
router.use('/products', require('./v1/products'));
router.use('/communities', require('./v1/communities'));

module.exports = router;