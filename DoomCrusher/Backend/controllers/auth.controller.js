
const usermodel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function LoginController (req ,res ) {
   
    const { username , email, password } = req.body;
    try {
        const user = await usermodel.findOne({ $or:[{email}, {username}] });
       

        if (!user) {
            return res.status(404).json({ message: 'Invalid Username' + (user.email == email)? 'User Email didnt match' :'User name didnt match'});
        }

         
        const hashedPassword = await bcrypt.compare(password, user.password);

        if (!hashedPassword) {
            return res.status(400).json({ message: 'Invalid Password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '14h' });

        res.cookie('token', token);
        res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email , bio:user.bio ,profile_image: user.profile_image} });
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
}


async function RegisterController(req, res) {
     const { username, email, password, bio, profile_image } = req.body;
        try { //$or means eather this or that select form them 
            const extinguser = await usermodel.findOne({ $or: [{ username }, { email }] });
            if (extinguser) {
               return res.status(409).json({ message: 'username alrady exists' + ((extinguser.email == email) ? 'Email already exist' : 'User Name alreay exist ')})
            }
    
            const hashed = await bcrypt.hash(password, 10);
            
            //save the user
            const user = await usermodel.create({ username, email, bio, profile_image, password: hashed });

            const token = jwt.sign({
                userId: user._id,
                email: user.email,
    
            },
                process.env.JWT_SECRET,
                { expiresIn: '14h' })
    
            res.cookie('token', token);
            res.status(200).json({ message: 'user Resgister successfully', user: { username: user.username, email: user.email, bio: user.bio, profile_image: user.profile_image } })
        } catch (error) {
            res.status(500).json({ message: `error Registering the user` })
        }
    
}
module.exports = {
    LoginController,
    RegisterController
}