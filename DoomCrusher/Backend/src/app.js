const express = require('express');
const app = express();
const authRoutes = require('../routes/app.routes');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const postRoutes = require('../routes/post.routes');


app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;
