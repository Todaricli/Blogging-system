const express = require('express');
const router = express.Router();

// router.get('/', async function (req, res) {
//     res.locals.title = 'My route title!';
//     res.locals.allTestData = await testDao.retrieveAllTestData();
//     res.render('home');
// });
const { verifyAuthenticated } = require('../middleware/auth-middleware/login-auth.js');

router.get('/', verifyAuthenticated, async function (req, res) {
    //res.locals.current_category = "Marketing";
    res.render('articlesHome');
});

router.get('/article', async function (req, res) {
    res.render('articleDemo');
});

router.get('/sub', function (req,res) {
    res.render('subscription&subscriber');
})

router.get('/profile', function (req,res) {
    res.render('profile');
})

module.exports = router;
