const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    content: {
        type: String,
        required: false
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'Account',
    }],
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'Account',
            required: true
        },
        username: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Account', 
        required: true
    },
    postImage: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', PostSchema);