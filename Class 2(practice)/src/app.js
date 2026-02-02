const express = require("express")

const app = express();

const notes = [];

app.use(express.json());

app.post("/notes", (req, res) => {
    console.log(req.body);
    notes.push(req.body);
    // console.log(notes);
    res.send("Note added successfully");
});
 
app.get("/notes", (req, res) => {
    res.send(notes);
});

app.delete("/notes/:id" , (req , res) => {
      delete notes[req.params.id];
      res.send("Note deleted successfully");
})

app.patch("/notes/:index" , (req , res) =>{
    notes[req.params.index].Description = req.body.Description;
    res.send("Note updated successfully");
})

module.exports = app;