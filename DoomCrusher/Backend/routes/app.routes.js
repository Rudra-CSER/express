const express = require('express');
const authRoutes = express.Router();
const usermodel = require('../models/user.model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/auth.controller')


authRoutes.post('/register', authController.RegisterController)



authRoutes.post('/login', authController.LoginController)


module.exports = authRoutes;