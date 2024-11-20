const router = require('express').Router();
const authenticateToken = require('../middlewares/authToken');

router.use('/', require('./v1/login'));
router.use('/users', require('./v1/users'));
router.use('/products', authenticateToken, require('./v1/products'));
router.use('/communities', authenticateToken, require('./v1/communities'));

module.exports = router;