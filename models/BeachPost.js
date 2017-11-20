let mongoose = require ("mongoose");
let Schema = mongoose.Schema;

let BeachPostSchema = new Schema({
  user: String,
  title: String,
  text: String,
})

module.exports = mongoose.model('BeachPost', BeachPostSchema);
