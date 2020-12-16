const router = require('express').Router();
// api routes
const apiRoutes = require('./apiRoutes');

router.use('/api', apiRoutes);

module.exports = router;
