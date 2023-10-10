const express = require('express');
const router = express.Router();

const userDb = require('../models/auth-dao');
const login = require('../middleware/auth-middleware/login-auth')
const register = require('../middleware/auth-middleware/register-auth')

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', login.authenticate, function (req, res) {
    res.redirect('/'); // redirect to home if user is authenticated
});

router.get('/logout', function (req, res) {
    res.clearCookie('authToken');
    res.setToastMessage('Successfully logged out!');
    res.redirect('/login');
});

router.get('/register', function (req, res) {
    res.render('register');
});

router.post('/register', register.authenticate, register.user, function (req, res) {
    res.setToastMessage('Successfully registered!');
    res.redirect('/login');
});

module.exports = router;
