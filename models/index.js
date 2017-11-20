let mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/stayseasfunsurfdb')

module.exports.Beach = require('./Beach');
module.exports.BeachPost = require('./BeachPost');
module.exports.User = require('./User');
