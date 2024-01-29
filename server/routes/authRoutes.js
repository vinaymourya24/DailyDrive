const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

require('dotenv').config();

const User = require('../models/user');

const SECRET_KEY = process.env.SECRET_KEY;

//SignUP
router.post('/register', async (req, res) => {
    try {
        console.log('POST /auth/register route reached');
        const { name, email, password } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required.' });
        }
        if (!email) {
            return res.status(400).json({ error: 'Email is required.' });
        }
        if (!password) {
            return res.status(400).json({ error: 'Password is required.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ error: 'Error signing up' });
    }
});

router.get('/users', async (req, res) => {
    try {
        console.log('GET /auth/users route reached');
        const users = await User.find();
        res.status(201).json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to get users' });
    }
});

//LOGIN
//GET
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }
        const token = jwt.sign({ userID: user._id }, SECRET_KEY, { expiresIn: '1hr' });
        res.json({ message: 'Login successful' });
    }
    catch (error) {
        console.error('Error Logging in:', error);
        res.status(500).json({ error: 'Error Logging in' })
    }
})
module.exports = router;
