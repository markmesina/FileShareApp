const passport = require('passport')
const { User } = require('../models')
module.exports = {
  createUser: async (req, res) => {
    try {
      if (req.user.registered === true) {
        throw new Error("You have already registered.");
      }
      const existingUser = await User.findOne({
        displayName_lower: req.body.displayName.toLowerCase()
      });
  
      if (existingUser) {
        throw new Error("Display name already in use! Try another.");
      }
  
      const user = await User.findByIdAndUpdate(
        { _id: req.user.id },
        {
          displayName: req.body.displayName,
          displayName_lower: req.body.displayName,
          registered: true,
          joined: Date.now()
        },
        { new: true }
      );
  
      await Promise.all([
        new Faves({
          _displayName: user.displayName,
          _owner: req.user.id
        }).save(),
        new Follows({
          _displayName: user.displayName,
          _owner: req.user.id
        }).save(),
        new Followers({
          _displayName: user.displayName,
          _owner: req.user.id
        }).save(),
        new MessageBox({
          _displayName: user.displayName,
          _owner: req.user.id
        }).save()
      ]);
  
      res.status(200).send(user);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }

}
