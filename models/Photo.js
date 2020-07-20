const mongoose = require('mongoose')

const PhotoSchema = new mongoose.Schema({
        image: String
        title: String
        content: String
        author: { type: mongoose.Schema.ObjectId, ref:
            "User"}
}, { timestamp: true})

module.exports = mongoose.model("Photo", PhotoSchema)
