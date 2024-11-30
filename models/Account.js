const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: false,
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
})

module.exports = mongoose.model('Account', AccountSchema);