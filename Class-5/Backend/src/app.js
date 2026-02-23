const express = require("express")
const notesModel = require("./models/notes.model")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "public", "dist")))

app.post("/notes", async (req, res) => {
    try {
        const { title, Description } = req.body
        const Notes = await notesModel.create({ title, Description })
        res.status(201).json({ message: "Notes created successfully", Notes })
    } catch (err) {
        res.status(500).json({ message: "Failed to create note", error: err.message })
    }
})

app.get("/notes", async (req, res) => {
    try {
        const Notes = await notesModel.find()
        res.status(200).json({ message: "Notes fetched successfully", Notes })
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch notes", error: err.message })
    }
})

app.patch("/notes/:id", async (req, res) => {
    try {
        const id = req.params.id
        const { title, Description } = req.body
        const updatedNotes = await notesModel.findByIdAndUpdate(id, { title, Description }, { new: true })
        res.status(200).json({ message: "Notes updated successfully", updatedNotes })
    } catch (err) {
        res.status(500).json({ message: "Failed to update note", error: err.message })
    }
})

app.delete("/notes/:id", async (req, res) => {
    try {
        const id = req.params.id
        await notesModel.findByIdAndDelete(id)
        res.status(200).json({ message: "Notes deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: "Failed to delete note", error: err.message })
    }
})

app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "dist", "index.html"))
})

module.exports = app