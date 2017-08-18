const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose)

const repSchema = mongoose.Schema({
        name: String,
        party: String,
        feed: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post'
        }]
})

repSchema.plugin(deepPopulate)

module.exports = mongoose.model('Rep', repSchema);
