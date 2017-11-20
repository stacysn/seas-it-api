let mongoose = require('mongoose')
let Schema = mongoose.Schema
let passportLocalMongoose = require('passport-local-mongoose')

let UserSchema = new Schema({
  first_name: String,
  last_name: String,
  password: String,
  email_address: String,
  username: String

})

UserSchema.plugin(passportLocalMongoose)

var User = mongoose.model('User', UserSchema)
module.exports = User
