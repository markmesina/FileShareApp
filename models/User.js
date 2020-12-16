const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  profilePhoto: String,
  displayName: { type: String, minlength: 4, maxlength: 12 },
  displayName_lower: { type: String, lowercase: true },
  joined: Number,
  profile: {
    name: String,
    website: String,
    facebook: String,
    twitter: String,
    location: String,
    about: String,
  },
  registered: { type: Boolean, default: false },
})

module.exports = model('User', userSchema)
