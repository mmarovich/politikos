const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
        comments: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
        }],
        date: String,
        username: String,
        link: String,
        headline: String,
        legits: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Legit'
        }]
})

module.exports = mongoose.model('Post', postSchema);