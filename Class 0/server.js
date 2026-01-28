
const express = require('express') //this is the server Instance Creation 

const app = express()

app.get('/' , (req , res)=>{
   res.send('Hello World')


})

app.get('/about' , (req , res)=>{
   res.send('About Page')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})  //for starting the server and priting to the terminal 