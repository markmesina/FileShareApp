const { Schema, model } = require('mongoose');

const FollowersSchema = new Schema({
  _displayName: String,
  _owner: { type: Schema.Types.ObjectId, ref: "User" },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

module.exports = model("Followers", FollowersSchema);
