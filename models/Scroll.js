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
        default: 'private',
        enum: ['private', 'select', 'friends', 'public'],
        required: true
    },
    selectUsers: {
        type: String,
        default: ''
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    coAuthors: {
        type: String,
        default: ''
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