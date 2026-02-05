/*
  -server start 
  -database connect
*/

//connct the MogoDB_url from .env file using require
//we have to use and install npm i dotenv


const mongoose = require("mongoose");
const env = require('dotenv').config();
//create a function to connect to the database
function connectDB() {

    //this is URI connection string for Database not the Cluster
    //if it doesn't exist it will create it via the links last digit
    mongoose.connect(env.parsed.MONGO_URL)
    .then(()=>{
        console.log(`Database connected`);
    })
    .catch((err)=>{
        console.log(`Sorry Bro ${err}`);
        
    })
}

connectDB();


const app = require("./src/app");


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})