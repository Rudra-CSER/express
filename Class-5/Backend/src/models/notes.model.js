const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({
    title: String,
    Description: String,
})

const NotesModel = mongoose.model("Mama" , notesSchema)

module.exports = NotesModel