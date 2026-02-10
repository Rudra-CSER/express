// Simplly create the model and then export it
// this will create the collection in the database
// 
const mongoose = require("mongoose");


// Fromat of the data 
const notesSchema = new mongoose.Schema({
    title: String,
    Description: String,
    
})


//name of the collection where all the data will be stored

const NotesModel = mongoose.model("Notes", notesSchema);


module.exports = NotesModel ;
