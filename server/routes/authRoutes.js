const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Token = require('../models/token');
const { createPost } = require('../controllers/authController');
require('dotenv').config();

const User = require('../models/user');
const { home, register, user, login } = require('../controllers/authController');

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

router.route('/').get(home);

// SignUP
router.route('/register').post(register);

router.route('/users').get(user);

// LOGIN
// POST
router.route('/login').post(login);

router.route('/posts').post(createPost);

module.exports = router;
