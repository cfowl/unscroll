const mongoose = require('mongoose');

const scrollSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    statusUsers: {
        type: String,
        default: ''
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('scroll', scrollSchema);