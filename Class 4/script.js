/*
  -server start 
  -database connect
*/

//connct the MogoDB_url from .env file using require
//we have to use and install npm i dotenv


const app = require("./src/app");
const connectDB = require("./src/config/database");

connectDB();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})