const mongoose = require("mongoose");
const env = require("dotenv").config();

function connectDB(){
    mongoose.connect(env.parsed.MONGO_URL)
    .then(()=>{
        console.log(`Database connected`);
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDB;






//create a function to connect to the database


    //this is URI connection string for Database not the Cluster
    //if it doesn't exist it will create it via the links last digit

