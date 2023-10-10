const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

const userDb = require('../models/auth-dao');

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const user = await userDb.getUserWithCredentials(username, password);
    if (user) {
        const authToken = uuid();
        userDb.setUserAuthToken(username, authToken); // save a token in database
        res.cookie('authToken', authToken);
        res.locals.user = user;
        res.redirect('/');
    } else {
        res.setToastMessage('Authentication Failed!');
        res.redirect('/login');
    }
});

router.get('/logout', function (req, res) {
    res.clearCookie('authToken');
    res.setToastMessage('Successfully logged out!');
    res.redirect('/login');
});

router.get('/register', function (req, res) {
  res.render('register');
});

router.post('/register', function (req, res) {
  
  res.render('register');
});

module.exports = router;
