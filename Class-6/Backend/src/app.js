const express = require('express');
const authRouter = require('../routes/auth.routes');
const cookieParser = require('cookie-parser');


const app = express();

app.use(express.json());
app.use('/api/auth', authRouter); //middleware for auth routes must /api/auth/routeName on postman to access the route
app.use(cookieParser());
module.exports = app;
