const express = require('express');
const router = express.Router();

const testDao = require('../models/test-dao.js');

// router.get('/', async function (req, res) {
//     res.locals.title = 'My route title!';
//     res.locals.allTestData = await testDao.retrieveAllTestData();
//     res.render('home');
// });

router.get('/', async function (req, res) {
    //res.locals.current_category = "Marketing";
    res.render('articlesHome');
});

router.get('/article', async function (req, res) {
    res.render('articleDemo');
});


router.get('/register', function(req, res) {
    res.render('register');
})

router.get('/login', function (req,res) {
    res.render('login');
})

router.get('/sub', function (req,res) {
    // res.locals.subscriptionList = ["1","2","3","4"];
    // res.locals.subscriberList = ["1","2","3","4","5"];
    res.render('subscription&subscriber');
})

module.exports = router;
