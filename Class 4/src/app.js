/*
 -server create
 -server configure
*/

const express = require("express");
const NotesModel = require("./models/notes.model");
const  ProductsModel  = require("./models/products.model");


const app = express();
app.use(express.json());    

app.post("/notes" , async (req ,res)=>{

    
    const {title , Description } = req.body;

    const note = await NotesModel.create({
        title,
        Description
    })
    // 
    res.status(201).json({
        message:`Notes Created on Database`,
        note
        
    })
})

// app.post("/products" , async (req ,res)=>{
        

//      const {name , price , description } = req.body;

//      const product = await ProductsModel.create({
//         name,
//         price,
//         description
//      })
//      res.status(201).json({
//         message:`Product Created on Database`,
//         product
        
//     })
// })

app.get("/notes" ,async (req , res)=>{
    const notes = await NotesModel.find()

  res.status(200).json({
    message:`Notes Data Fetchd`,
    notes
  })
})


module.exports = app;