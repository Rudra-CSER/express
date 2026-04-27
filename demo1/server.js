// import express from 'express';   
require('express'); // CommonJS syntax

const app = express();   



const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});