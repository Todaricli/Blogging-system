const express = require('express');
const router = express.Router();

const testDao = require('../models/test-dao.js');
const articleDao = require('../models/article-dao.js');
const genericDao = require('../models/generic-dao.js');


// router.get('/', async function (req, res) {
//     res.locals.title = 'My route title!';
//     res.locals.allTestData = await testDao.retrieveAllTestData();
//     res.render('home');
// });
const { verifyAuthenticated } = require('../middleware/auth-middleware.js');

router.get('/', verifyAuthenticated, async function (req, res) {
    //res.locals.current_category = "Marketing";

    // const username = 
    // res.locals.user = 

    res.locals.top5Articles = await articleDao.getTopFiveArticles();

    res.locals.articleData = await articleDao.getAllArticles();
    // res.locals.
    // res.locals.
    // res.locals.


    res.render('articlesHome');
});

router.get('/article', async function (req, res) {

    // res.locals. =



    res.render('articleDemo');
});

module.exports = router;
