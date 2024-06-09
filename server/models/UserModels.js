const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    des: String,
})

const UserModel = mongoose.model('demo', UserSchema)

module.exports = UserModel;