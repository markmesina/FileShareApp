const router = require('express').Router();
// api routes
const apiRoutes = require('./apiRoutes');
const authRoutes = require('./authRoutes')

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);

module.exports = router;
