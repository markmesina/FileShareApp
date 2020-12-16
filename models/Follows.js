const { Schema, model } = require('mongoose');

const Follows = new Schema({
  _displayName: String,
  _owner: { type: Schema.Types.ObjectId, ref: "User" },
  follows: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

module.exports = model("Follows", Follows);
