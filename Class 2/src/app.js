const express = require("express");

const app = express();

// app.use(express.json());    --> middlewsare not req right now

app.use(express.json());
const notes = [];

app.post("/notes" , (req , res )=> {
    console.log(req.body);
    notes.push(req.body);
    console.log(notes);
    
    res.send("Note added successfully");
    
})

app.get("/notes" , (req , res )=> {
    res.send(notes);
})


//parms needs to be used for single value,
//body needs to be used for multiple value

app.delete("/notes/:id" , (req , res) =>{
    //  console.log(req.params.id);
    delete notes[req.params.id]    
    
    res.send("Note deleted successfully");
})

// patch is used to update the value
// req.body = {description : "new description"}

app.patch("/notes/:index" , (req , res) => {
  
    notes[req.params.index].Description = req.body.Description;
    
    res.send("Note updated successfully");
    
})


module.exports = app;