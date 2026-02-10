
const mongoose = require("mongoose");


const ProductsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    
})

const ProductsModel = mongoose.model("Products", ProductsSchema);

module.exports = ProductsModel;
