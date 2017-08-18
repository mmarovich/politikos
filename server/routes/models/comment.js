const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    username: String,
    comment: String,
    date: String
})

module.exports = mongoose.model('Comment', commentSchema);