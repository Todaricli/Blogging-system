const { v4: uuid } = require('uuid');
const userDb = require('../../models/auth-dao');

async function addUserToLocals(req, res, next) {
    const authToken = req.cookies['authToken'];
    res.locals.user = await userDb.getUserWithAuthToken(authToken);
    next();
}

function verifyAuthenticated(req, res, next) {
    if (res.locals.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

async function authenticate(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const user = await userDb.getUserWithCredentials(username, password);

    if (user) {
        const authToken = uuid();
        await userDb.setUserDbAuthToken(username, authToken); // Save token in the database
        res.cookie('authToken', authToken);
        res.locals.user = user;
        next(); // logged in
    } else {
        res.setToastMessage('Authentication Failed!');
        res.redirect('/login');
    }
}

module.exports = {
    verifyAuthenticated,
    addUserToLocals,
    authenticate,
};
