
const mongoose = require('mongoose');
const userModel = require('./user.model');

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: '',
    },
    imgUrl: {
        type: String,
        required: [true , "imgUrl is required"],
    },
    user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User-DoomCrusher',
         required: [true , "createdbyuser is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

}) 

const PostModel = mongoose.model('Post-DoomCrusher', postSchema);

module.exports = PostModel;