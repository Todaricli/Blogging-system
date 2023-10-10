const authDao = require('../../models/auth-dao');
const userDb = require('../../models/generic-dao');

async function authenticate(req, res, next) {
    req.username = req.body.username;
    const users = await userDb.getAllUserData();
    const userMatch = users.find(function (user) {
        return user.username === req.username;
    });
    if (userMatch) {
        res.setToastMessage('Username taken, please choose another');
        return res.redirect('/register');
    }

    req.password = req.body.password;
    req.confirm_password = req.body.confirm_password;
    console.log(req.password);
    console.log(req.confirm_password);
    if (req.password !== req.confirm_password) {
        res.setToastMessage('Please ensure the passwords match');
        return res.redirect('/register');
    }
    next();
}

async function user(req, res, next) {
    req.name = req.body.name;
    req.email = req.body.email;
    await authDao.createNewUser(
        req.name,
        req.username,
        req.email,
        req.password
    );
    next();
}

module.exports = {
    authenticate,
    user,
};
