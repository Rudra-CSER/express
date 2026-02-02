const express = require("express");
const app = express();

const notes = []

app.use(express.json());

app.post("/notes", (req, res) => {
    
    notes.push(req.body);
   
    // we will use status code 201 for created
    //this is the actual way to send response
    res.status(201).json({
        message: "Notes added successfully"
    })


});
//get all notes using status code 200 and the messgae inside
app.get("/notes", (req, res) => {
    
    res.status(200).json({
        notes:notes,
        message: "Notes fetched successfully"
    })
    
});

app.delete("/notes/:id", (req, res) => {
   delete notes[req.params.id];

   //this will not send any response on 204 it will send empty response for resopse we have to use 200
   res.status(200).json({
    message: "Note deleted successfully"
   })  
    
})


app.patch("/notes/:id", (req, res) => {
   notes[req.params.id].Description = req.body.Description; 
   
   res.status(200).json({
    message: "Note updated successfully"
   })
})


module.exports = app;