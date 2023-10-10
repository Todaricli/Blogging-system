const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

const userDb = require('../models/test-auth');

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const user = await userDb.getUserWithCredentials(username, password);
    if (user) {
        const authToken = uuid();
        user.authToken = authToken; // save this as a property for the database
        console.log(user);
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

module.exports = router;
