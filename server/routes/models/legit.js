const mongoose = require('mongoose');

const legitSchema = mongoose.Schema({
    username: String,
    vote: Number
})

module.exports = mongoose.model('Legit', legitSchema);