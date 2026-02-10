const express = require("express")
const notesModel = require("./models/notes.model")
const cors = require("cors")


const app = express()
app.use(cors())
app.use(express.json())



app.post("/notes", async(req, res) => {
   
   const {title, Description} = req.body
    const Notes = await notesModel.create({
        title,
        Description
    })

    res.status(201).json({
        message: "Notes created successfully",
        Notes
    })
})

app.get("/notes", async (req, res) => {
    const Notes = await notesModel.find()
    res.status(201).json({
        Message: "Notes fetched successfully",
        Notes
    })
})


// patch

app.patch("/notes/:id", async (req, res) => {
 const id = req.params.id
 const {Description} = req.body

const updatedNotes = await notesModel.findByIdAndUpdate(id, {Description})

res.status(200).json({
    message: "Notes updated successfully",
    updatedNotes
})

})



 module.exports = app