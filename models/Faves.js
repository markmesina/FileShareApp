const { Schema, model } = require('mongoose');

const FavesSchema = new Schema({
  _displayName: String,
  _owner: { type: Schema.Types.ObjectId, ref: "User" },
  _faves: [{ type: Schema.Types.ObjectId, ref: "Post" }]
});

module.exports = model("Faves", FavesSchema);
