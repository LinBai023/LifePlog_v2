// mongoDB User data model
const mongoose = require('mongoose')

// user id is auto generated whenever create a new user
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    picture: String
})

module.exports = mongoose.model("User", UserSchema)
