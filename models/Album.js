const { Schema, model } = require('mongoose');

const AlbumSchema = new Schema({
  _displayName: String,
  name: String,
  createdAt: Number,
  coverImg: String,
  _owner: { type: Schema.Types.ObjectId, ref: "User" },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
});

module.exports = model("Album", AlbumSchema);
