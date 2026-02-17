const express = require("express")
const notesModel = require("./models/notes.model")
const cors = require("cors")

// for cross origin resource sharing - to allow frontend and backend to communicate with each other 
// by default, frontend and backend are on different ports, so we need to allow them to communicate with each other   

const app = express()
app.use(cors())
app.use(express.json())
// Serve the production build output (Vite) placed in Backend/public/dist


//post API
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

//Get API 
app.get("/notes", async (req, res) => {
    const Notes = await notesModel.find()
    res.status(201).json({
        Message: "Notes fetched successfully",
        Notes
    })
})


// patch API

app.patch("/notes/:id", async (req, res) => {
 const id = req.params.id
 const {title , Description} = req.body

const updatedNotes = await notesModel.findByIdAndUpdate(id, {title, Description})

res.status(200).json({
    message: "Notes updated successfully",
    updatedNotes
})

})
// delete API
app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id
  await notesModel.findByIdAndDelete(id)
  res.status(200).json({ message: "Notes deleted successfully" })
})


 module.exports = app