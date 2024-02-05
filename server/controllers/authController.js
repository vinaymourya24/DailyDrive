const User = require('../models/user');
const Token = require('../models/token');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

const home = async (req, res) => {
    try {
        res.status(200)
            .send("Welcome to our Website DailyDrive");
    }
    catch (error) {
        console.log(error);
    }
}

const register = async (req, res) => {
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
};

const user = async (req, res) => {
    try {
        console.log('GET /auth/users route reached');
        const users = await User.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Unable to get users' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'User Not Found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect Password' });
        }
        const accessToken = jwt.sign(user.toJSON(), ACCESS_SECRET_KEY, { expiresIn: '30m' });
        const refreshToken = jwt.sign(user.toJSON(), REFRESH_SECRET_KEY);
        const newToken = new Token({ token: refreshToken });

        await newToken.save();

        console.log('Successful login');
        return res.status(201).json({ accessToken, refreshToken, email });
    } catch (error) {
        console.error('Error Logging in:', error);
        res.status(500).json({ error: 'Error Logging in' });
    }
};

module.exports = { home, register, user, login };