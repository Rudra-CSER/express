const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('../routes/auth.routes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter); //middleware for auth routes must /api/auth/routeName on postman to access the route

module.exports = app;
