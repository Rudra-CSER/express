
const app = require("./src/app")
const connectToDB = require("./src/config/database")
const path = require("path")


app.use(express.static(path.join(__dirname, '../public/dist')))

connectToDB()

app.listen(3000, ()=>{
    console.log(`Server stated `);
    
})