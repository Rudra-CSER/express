const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    followers: { 
        type: Array },
    profile_image: {
         type: String ,
        default:'https://ik.imagekit.io/n2eomiumm/download.png' },

})


const User = mongoose.model('User-DoomCrusher', userSchema);

module.exports = User;