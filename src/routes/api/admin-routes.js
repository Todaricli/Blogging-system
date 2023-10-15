const { v4: uuid } = require('uuid');
const express = require('express');
const router = express.Router();

const login = require('../../middleware/auth-middleware/login-auth');
const authDao = require('../../models/auth-dao');

router.post('/api/login', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = await authDao.getUserWithCredentials(username, password);
    if (user) {
        const authToken = uuid();
        await authDao.setUserDbAuthToken(username, authToken); // Save token in the database
        res.cookie('authToken', authToken);
        res.locals.user = user;
        console.log(authToken);
        res.status(204).json({ authToken }); // postman just stops at 204
    } else {
        res.status(401).send('Unauthorized');
    }
});

router.get('/api/logout', function (req, res) {
  console.log("testing");
  res.clearCookie('authToken');
  res.status(204).send('logged out');
});

module.exports = router;
