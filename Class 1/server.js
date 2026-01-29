const express = require("express");

const app = express();

app.use(express.json()); // this is a middleware  

const notes = [
    {
        title:"Note 1",
        Description:"Description 1"
    },
    {
        title:"Note 2",
        Description:"Description 2"
    },
    {
        title:"Note 3",
        Description:"Description 3"
    }
]
//for acceing frontend data reqest/ req is uesd 
// for sending data to frontend response / res is used


//this will add new note via sending post methode in postman
app.post("/notes", (req, res) => {
   console.log(req.body);
   notes.push(req.body);
   res.send("Note added successfully");
})

//this will get all the updated notes via sending get methode in postman
app.get("/notes", (req, res) => {
    res.send(notes);
})

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
})