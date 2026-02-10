const mongoose = require("mongoose")
const env = require("dotenv").config()

function connectToDB() {
 mongoose.connect(process.env.MONGO_URI)
 .then(()=>{
    console.log(`Data Base Connected`);
    
 })
}

module.exports = connectToDB