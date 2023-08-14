const router = require('express').Router();
const apiRoutes = require('./api');
const authRoutes = require('./authRoutes');
const homeRoutes = require('./homeRoute');
const dashboardRoutes = require('./dashboardRoute')
const postRoutes = require('./postRoute')

router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/post', postRoutes);
router.use('/user', authRoutes);
router.use('/', homeRoutes);

module.exports = router;
