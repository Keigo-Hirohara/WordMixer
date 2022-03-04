const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
    idea: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('idea', ideaSchema);