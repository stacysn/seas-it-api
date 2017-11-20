let mongoose = require ("mongoose");
let Schema = mongoose.Schema;
let BeachPost = require('./BeachPost.js')

let BeachSchema = new Schema({
  name: String,
  location: String,
  longitude: Number,
  latitude: Number,
  spot_id: Number,
  // swell: String,
  // tide: String,
  // wind: String,
  // size: Number,
  beachPosts: [BeachPost.schema]
})

module.exports = mongoose.model('Beach', BeachSchema);
