const express = require('express');
const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const authRouter = express.Router();
const bycrypt = require('bcrypt');
/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }
    const hash = await bycrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hash });

    const token = jwt.sign(
        { userId: user._id,
          email: user.email }
        , process.env.jwt_secret, 
        { expiresIn: '3d' });
    
    res.cookie('token', token)

    res.status(201).json({ message: 'User registered successfully', user, token });
});


/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post('/login', async (req, res) => {
   const {email, password} = req.body;
    const user = await userModel.findOne({ email });
    
    if(!user){
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bycrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({ message: 'Invalid credentials' });    
    }

    const token = jwt.sign(
        { userId: user._id,
          email: user.email }
        , process.env.jwt_secret, 
        { expiresIn: '3d' });
    
    res.cookie('token', token)

    res.status(200).json({ message: 'Login successful', user, token });
});

/**
 * @desc Logout a user
 * @route POST /api/auth/logout
 * @access Public
 */
 
authRouter.post('/logout', (req, res) => {
    const {userId } = req.body;

    const user = userModel.findOne({ _id: userId })

    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});
/** 
 * @desc Get user details by get-me
 * @route GET /api/auth/get-me
 * @access Public
 */
authRouter.get('/get-me', async (req, res) => {
    const token = req.cookies.token;

    const decode = jwt.verify(token, process.env.jwt_secret);

    const user = await userModel.findById(decode.userId);
   
    res.json({ name: user.name, email: user.email });
});


/**
 * @desc Delete a user account by email
 * @route DELETE /api/auth/delete
 * @access Public
 */

authRouter.delete('/delete', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const deletedUser = await userModel.findOneAndDelete({ email });

    if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.clearCookie('token');
    res.status(200).json({ message: 'User deleted successfully' });
})

module.exports = authRouter;