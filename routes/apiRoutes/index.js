const router = require('express').Router();

const authRoutes = require("./authRoutes");
// const uploadRoutes = require("./uploadRoutes");
// const postRoutes = require("./postRoutes");
// const albumRoutes = require("./albumRoutes");
// const profileRoutes = require("./profileRoutes");
// const messageRoutes = require("./messageRoutes");

// /api prepended

router.use('/auth', authRoutes);
// router.use('/upload',uploadRoutes)
// router.use('/post',postRoutes)
// router.use('/album',albumRoutes)
// router.use('/profile',profileRoutes)
// router.use('/message',messageRoutes)

module.exports= router;